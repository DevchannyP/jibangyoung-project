
// AuthException.java
package com.jibangyoung.domain.auth.exception;

public class AuthException extends RuntimeException {
    private final AuthErrorCode code;

    public AuthException(AuthErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
    public AuthErrorCode getCode() {
        return code;
    }
}