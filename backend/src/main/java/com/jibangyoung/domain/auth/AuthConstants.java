// backend/src/main/java/com/jibangyoung/domain/auth/AuthConstants.java
package com.jibangyoung.domain.auth;

public final class AuthConstants {
    private AuthConstants() {}
    
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String REFRESH_TOKEN_HEADER = "Refresh-Token";
    
    public static final int MAX_REFRESH_TOKENS_PER_USER = 5;
    public static final int PASSWORD_MIN_LENGTH = 8;
    public static final int PASSWORD_MAX_LENGTH = 100;
    public static final int USERNAME_MIN_LENGTH = 4;
    public static final int USERNAME_MAX_LENGTH = 50;
    
    public static final String DEFAULT_PROFILE_IMAGE = "/images/default-profile.png";
    
    // Error Messages
    public static final String USER_NOT_FOUND = "USER_NOT_FOUND";
    public static final String INVALID_PASSWORD = "INVALID_PASSWORD";
    public static final String ACCOUNT_LOCKED = "ACCOUNT_LOCKED";
    public static final String INVALID_TOKEN = "INVALID_TOKEN";
    public static final String EXPIRED_TOKEN = "EXPIRED_TOKEN";
    public static final String USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS";
    public static final String EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS";
}