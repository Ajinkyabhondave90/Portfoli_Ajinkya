package com.ajinkya.portfolio.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ContactRequest
{

    @NotBlank(message = "First name is required")
    @Size(max = 60)
    private String firstName;

    @Size(max = 60)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 120)
    private String email;

    @Size(max = 20)
    private String phone;

    @Size(max = 60)
    private String service;

    @NotBlank(message = "Message is required")
    @Size(max = 2000)
    private String message;

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
}
