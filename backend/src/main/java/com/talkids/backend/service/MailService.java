package com.talkids.backend.service;

import com.talkids.backend.dto.MailDto;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    private static final String title = "TalKids 임시 비밀번호 안내 이메일입니다.";
    private static final String fromAddress = "talkids5@naver.com";


    /** 이메일 전송 **/
    public void sendEmailMessage(String tmpPassword, String email) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, email); // 보낼 이메일 설정
        message.setSubject(title); // 이메일 제목
        message.setText(setContext(tmpPassword), "utf-8", "html"); // 내용 설정(Template Process)
        message.setFrom(new InternetAddress(fromAddress, "TalKids"));

        mailSender.send(message); // 이메일 전송
    }

    /** 타임리프 설정하는 코드 */
    private String setContext(String code) {
        Context context = new Context();
        context.setVariable("code", code); // Template에 전달할 데이터 설정
        return templateEngine.process("findPw", context);
    }

}