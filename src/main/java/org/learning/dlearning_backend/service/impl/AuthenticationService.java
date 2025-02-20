package org.learning.dlearning_backend.service.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.learning.dlearning_backend.dto.request.IntrospectRequest;
import org.learning.dlearning_backend.dto.request.LogoutRequest;
import org.learning.dlearning_backend.dto.request.RefreshTokenRequest;
import org.learning.dlearning_backend.dto.request.SignInRequest;
import org.learning.dlearning_backend.dto.response.IntrospectResponse;
import org.learning.dlearning_backend.dto.response.AuthenticationResponse;
import org.learning.dlearning_backend.exception.AppException;
import org.learning.dlearning_backend.exception.ErrorCode;
import org.learning.dlearning_backend.exception.ExpiredTokenException;
import org.learning.dlearning_backend.exception.InvalidTokenException;
import org.learning.dlearning_backend.model.InvalidDateToken;
import org.learning.dlearning_backend.model.User;
import org.learning.dlearning_backend.repository.InvalidTokenRepository;
import org.learning.dlearning_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    InvalidTokenRepository invalidTokenRepository;

    @NonFinal
    @Value("${jwt.secretKey}")
    protected String SECRET_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refresh-duration}")
    protected long REFRESHABLE_DURATION;
    public AuthenticationResponse signIn(SignInRequest request) {
        log.info("User {} is signing in", request.getEmail());

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!authenticated){
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        }
        if(!Boolean.TRUE.equals(user.getEnabled())){
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }
        var token = generateToken(user);

        String role = user.getRole().getName();

        return AuthenticationResponse.builder()
                .token(token)
                .role(role)
                .authenticated(Boolean.TRUE)
                .build();
    }

    public String generateToken(User user) {
         JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

         JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("dlearning")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SECRET_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new AppException(ErrorCode.TOKEN_CREATION_FAILED);
        }
    }
    private String buildScope(User user){
        StringJoiner joiner = new StringJoiner(" ");
        Optional.ofNullable(user.getRole()).ifPresent(role-> {
            joiner.add(role.getName());
            Optional.ofNullable(role.getPermissions()).ifPresent(permissions -> permissions.forEach(permission -> joiner.add(permission.getName())));
        });
        return joiner.toString();
    }

    public AuthenticationResponse generateRefreshToken(RefreshTokenRequest request) throws ParseException, JOSEException {
        var signedJWT = verification(request.getToken(), true);
        var jid = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidDateToken invalidDateToken = InvalidDateToken.builder()
                .id(jid)
                .expiryTime(expiryTime)
                .build();

        invalidTokenRepository.save(invalidDateToken);
        var email = signedJWT.getJWTClaimsSet().getSubject();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return AuthenticationResponse.builder()
                .authenticated(Boolean.TRUE)
                .token(generateToken(user))
                .role(user.getRole().getName())
                .build();
    }
    public SignedJWT verification(String token, boolean isRefresh) throws JOSEException, ParseException {
        if (token == null || token.trim().isEmpty()) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

            SignedJWT signedJWT = SignedJWT.parse(token);
            Date expiryTime = (isRefresh) ?
                    new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(REFRESHABLE_DURATION, ChronoUnit.HOURS).toEpochMilli()) :
                    signedJWT.getJWTClaimsSet().getExpirationTime();
            if (expiryTime.before(new Date())) {
                throw  new ExpiredTokenException();
            }
            var verified = signedJWT.verify(verifier);
            if (!verified) {
                throw new InvalidTokenException();
            }

            if(invalidTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
                throw new InvalidTokenException();

            return signedJWT;
    }
    public IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException {
        var token = request.getToken();
        boolean isValid = true;
        String scope = "";
        try{
            SignedJWT signedJWT = verification(token,false);
            scope = (String) signedJWT.getJWTClaimsSet().getClaim("scope");
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .scope(scope)
                .build();
    }
    public void logout(LogoutRequest request){
        try{
            var signedJWT = verification((request.getToken()),false);
            String jid = signedJWT.getJWTClaimsSet().getJWTID();
            if(!invalidTokenRepository.existsById(jid)){
                invalidTokenRepository.save(InvalidDateToken.builder()
                        .id(jid)
                        .expiryTime(signedJWT.getJWTClaimsSet().getExpirationTime())
                        .build());
            }
            else{
               log.info("Token already invalidated");
            }
        }catch (Exception e){
            log.error("Cannot logout", e);
            throw new RuntimeException(e.getMessage());
        }
    }




}
