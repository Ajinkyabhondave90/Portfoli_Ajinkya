package com.ajinkya.portfolio.repository;

import com.ajinkya.portfolio.model.ContactMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> 
{
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
}
