package org.learning.dlearning_backend.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.TopicDescription;
import org.learning.dlearning_backend.dto.event.NotificationEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class EmailService {

    @NonFinal
    @Value("${spring.mail.username}")
    String emailFrom;
    JavaMailSender javaMailSender;
    SpringTemplateEngine springTemplateEngine;
    @KafkaListener(topics = "notification-send-otp", groupId = "my-consumer-group")
    @Retryable(
            retryFor = {MessagingException.class},
            maxAttempts = 3,
            backoff = @Backoff(delay = 2000,multiplier = 2)
    )
    public void sendEmail(NotificationEvent event){
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        log.warn("Email from: {}", emailFrom);
        log.warn("Email to: {}", event.getRecipient());
        try{
            helper.setFrom(emailFrom, "Vo Van Nghia Hiep");
            helper.setTo(event.getRecipient());
            helper.setSubject(event.getSubject());
            helper.setText(event.getTemplateCode(), true);
            javaMailSender.send(message);
        }
        catch (Exception e){
            log.error("Error sending email: {}", e.getMessage());
        }
    }

    @KafkaListener(topics = "notification-delivery", groupId = "my-consumer-group")
    public void sendEmailByKafka(NotificationEvent event) throws MessagingException, UnsupportedEncodingException, ExecutionException, InterruptedException {
        log.info("Received Kafka message to send email: {}", event);
        Context context = new Context();
        context.setVariable("recipientName", event.getRecipient());
        if(event.getParam() != null){
            context.setVariables(event.getParam());
        }
        else{
            log.warn("No param found in event");
        }
        String htmlContent = springTemplateEngine.process(event.getTemplateCode(), context);

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");
        helper.setTo(event.getRecipient());
        helper.setSubject(event.getSubject());
        helper.setText(htmlContent, true);
        helper.setFrom(emailFrom, "Chippo Learning Team");
        javaMailSender.send(message);
        log.info("Email sent successfully");
    }
    @Recover
    public void recover(MessagingException e,NotificationEvent event){
        log.error("Failed to send email after multiple attempts: {}", event, e);
    }

}
