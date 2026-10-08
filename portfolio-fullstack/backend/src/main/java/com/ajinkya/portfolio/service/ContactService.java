package com.ajinkya.portfolio.service;

import com.ajinkya.portfolio.dto.ContactRequest;
import com.ajinkya.portfolio.model.ContactMessage;
import com.ajinkya.portfolio.repository.ContactMessageRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/** Saves contact messages and (optionally) emails them to the portfolio owner. */
@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repository;

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${portfolio.mail.enabled:false}")
    private boolean mailEnabled;

    @Value("${portfolio.mail.to:}")
    private String mailTo;

    @Value("${spring.mail.username:}")
    private String mailFrom;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage save(ContactRequest request) {
        ContactMessage m = new ContactMessage();
        m.setFirstName(request.getFirstName().trim());
        m.setLastName(request.getLastName());
        m.setEmail(request.getEmail().trim());
        m.setPhone(request.getPhone());
        m.setService(request.getService());
        m.setMessage(request.getMessage().trim());
        ContactMessage saved = repository.save(m);
        notifyOwner(saved);
        return saved;
    }

    public List<ContactMessage> findAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    /** Email problems must never stop the message from being saved. */
    private void notifyOwner(ContactMessage m) {
        if (!mailEnabled || mailSender == null || mailTo.isEmpty()) {
            return;
        }
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            if (!mailFrom.isEmpty()) {
                mail.setFrom(mailFrom);
            }
            mail.setTo(mailTo);
            mail.setReplyTo(m.getEmail());
            mail.setSubject("Portfolio enquiry from " + m.getFirstName());
            mail.setText("Name: " + m.getFirstName() + " " + (m.getLastName() == null ? "" : m.getLastName())
                    + "\nEmail: " + m.getEmail()
                    + "\nPhone: " + (m.getPhone() == null ? "" : m.getPhone())
                    + "\nService: " + (m.getService() == null ? "" : m.getService())
                    + "\n\n" + m.getMessage());
            mailSender.send(mail);
        } catch (Exception e) {
            log.warn("Could not send notification email: {}", e.getMessage());
        }
    }
}
