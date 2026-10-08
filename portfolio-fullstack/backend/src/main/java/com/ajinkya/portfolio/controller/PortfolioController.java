package com.ajinkya.portfolio.controller;

import com.ajinkya.portfolio.dto.ContactRequest;
import com.ajinkya.portfolio.model.ContactMessage;
import com.ajinkya.portfolio.service.ContactService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class PortfolioController 
{

    private final JsonNode portfolio;
    private final ContactService contactService;

    @Value("${portfolio.admin-token}")
    private String adminToken;

    public PortfolioController(ContactService contactService, ObjectMapper mapper) throws IOException
    {
        this.contactService = contactService;
        try (InputStream in = new ClassPathResource("portfolio.json").getInputStream()) 
        {
            this.portfolio = mapper.readTree(in);
        }
    }

    @GetMapping("/profile")
    public JsonNode profile()
    {
        return portfolio;
    }

    @PostMapping("/contact")
    public ResponseEntity<Object> contact(@Valid @RequestBody ContactRequest request) 
    {
        ContactMessage saved = contactService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap("message", "Thanks " + saved.getFirstName() + ", your message was received."));
    }

 
    @GetMapping("/admin/messages")
    public List<ContactMessage> messages(@RequestHeader(value = "X-Admin-Token", required = false) String token)
    {
        if (token == null || !token.equals(adminToken)) 
        {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin token");
        }
        return contactService.findAll();
    }
}
