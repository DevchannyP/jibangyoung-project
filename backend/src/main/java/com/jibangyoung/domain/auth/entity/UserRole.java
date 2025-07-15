// backend/src/main/java/com/jibangyoung/domain/auth/entity/UserRole.java
package com.jibangyoung.domain.auth.entity;

public enum UserRole {
    USER("사용자"),
    ADMIN("관리자"),
    MENTOR("멘토");
    
    private final String description;
    
    UserRole(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
}
