// 📦 UserRole.java
package com.jibangyoung.domain.auth.entity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum UserRole {
    USER("사용자"),
    ADMIN("관리자"),
    MENTOR("멘토");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }
    public String getDescription() { return description; }

    // Security 권한 변환
    public SimpleGrantedAuthority toGrantedAuthority() {
        return new SimpleGrantedAuthority("ROLE_" + this.name());
    }
}

