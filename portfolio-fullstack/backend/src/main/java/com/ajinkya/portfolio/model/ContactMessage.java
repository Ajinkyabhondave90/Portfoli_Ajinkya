package com.ajinkya.portfolio.model;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String firstName;

    @Column(length = 60)
    private String lastName;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(length = 60)
    private String service;

    @Column(nullable = false, length = 2000)
    private String message;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() 
    {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() 
    {
    	return id; 
    }
    public String getFirstName()
    { 
    	return firstName; 
    }
    public void setFirstName(String firstName)
    { 
    	this.firstName = firstName;
    }
    public String getLastName() 
    { 
    	return lastName; 
    }
    public void setLastName(String lastName) 
    { 
    	this.lastName = lastName; 
    }
    public String getEmail() 
    { 
    	return email; 
    }
    public void setEmail(String email) 
    {
    	this.email = email; 
    }
    public String getPhone() 
    { 
    	return phone; 
    }
    public void setPhone(String phone) 
    { 
    	this.phone = phone; 
    }
    public String getService() 
    { 
    	return service; 
    }
    public void setService(String service) 
    { 
    	this.service = service;
    }
    public String getMessage()
    { 
    	return message;
    }
    public void setMessage(String message) 
    {
    	this.message = message;
    }
    public LocalDateTime getCreatedAt() 
    { 
    	return createdAt;
    }
}
