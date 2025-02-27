package org.learning.dlearning_backend.service.impl;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class EmailService {

    @NonFinal
    @Value("${spring.mail.username}")
    String emailFrom;

    JavaMailSender javaMailSender;

    public void sendEmail(String subject, String content, List<String> toList){
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        log.warn("Email from: {}", emailFrom);
        log.warn("Email to: {}", toList.toArray(new String[0]));
        try{
            helper.setFrom(emailFrom, "Vo Van Nghia Hiep");
            helper.setTo(toList.toArray(new String[0]));
            helper.setSubject(subject);
            helper.setText(content, true);
            javaMailSender.send(message);
        }
        catch (Exception e){
            log.error("Error sending email: {}", e.getMessage());
        }
    }

}
