package org.learning.dlearning_backend.utils;

import lombok.RequiredArgsConstructor;
import org.learning.dlearning_backend.configuration.VNPayConfiguration;
import org.learning.dlearning_backend.model.PaymentInfo;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Random;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VNPayUtil {
    private static final Random RANDOM = new Random();
    private final VNPayConfiguration vnPayConfig;

    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException("Key or Data is null for HMAC SHA512");
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes(StandardCharsets.UTF_8);
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Error generating HMAC SHA512 hash", ex);
        }
    }
    public static String getRandomNumber(int len) {
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(RANDOM.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public String getPaymentURL(PaymentInfo paymentInfo) {
        Map<String, String> params = vnPayConfig.getVNPayConfig();
        ZoneId zone = TimeZone.getTimeZone("GMT+7").toZoneId();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

        params.put("vnp_TxnRef", paymentInfo.getReference());
        params.put("vnp_OrderInfo", paymentInfo.getDescription());
        params.put("vnp_Amount", paymentInfo.getAmount().setScale(0, RoundingMode.DOWN).toString());
        params.put("vnp_CreateDate", formatter.format(paymentInfo.getCreatedAt().atZone(zone).toLocalDateTime()));
        params.put("vnp_ExpireDate", formatter.format(paymentInfo.getExpiredAt().atZone(zone).toLocalDateTime()));
        params.put("vnp_IpAddr", paymentInfo.getIpAddress());

        String query = buildQuery(params, true);
        String checksum = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), buildQuery(params, false));
        query += "&vnp_SecureHash=" + checksum;

        return vnPayConfig.getVnp_PayUrl() + "?" + query;
    }

    private String buildQuery(Map<String, String> params, boolean encodeKey) {
        return params.entrySet().stream()
                .filter(e -> e.getValue() != null && !e.getValue().isEmpty())
                .sorted(Map.Entry.comparingByKey())
                .map(e -> {
                    Charset charset = StandardCharsets.US_ASCII;
                    String key = encodeKey ? URLEncoder.encode(e.getKey(), charset) : e.getKey();
                    return key + "=" + URLEncoder.encode(e.getValue(), charset);
                })
                .collect(Collectors.joining("&"));
    }

}
