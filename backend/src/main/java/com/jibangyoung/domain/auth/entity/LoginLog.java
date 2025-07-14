package com.jibangyoung.domain.auth.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;


@Entity
public class LoginLog {
    @Id @GeneratedValue
    private Long id;

    private Long userId;
    private String ip;
    private String userAgent;
    private LocalDateTime loginAt;
}
