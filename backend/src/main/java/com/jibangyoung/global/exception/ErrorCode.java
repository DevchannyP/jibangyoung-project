package com.jibangyoung.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 일반적인 에러
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", "내부 서버 오류가 발생했습니다."),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "INVALID_INPUT_VALUE", "입력값이 올바르지 않습니다."),

    // 인증 관련 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "사용자를 찾을 수 없습니다."),
    INVALID_LOGIN_CREDENTIALS(HttpStatus.UNAUTHORIZED, "INVALID_LOGIN_CREDENTIALS", "아이디 또는 비밀번호가 올바르지 않습니다."),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "INVALID_PASSWORD", "비밀번호가 올바르지 않습니다."),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "PASSWORD_MISMATCH", "비밀번호가 일치하지 않습니다."),

    // 토큰 관련 에러
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "INVALID_TOKEN", "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "EXPIRED_TOKEN", "만료된 토큰입니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN", "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "EXPIRED_REFRESH_TOKEN", "만료된 리프레시 토큰입니다."),

    // 사용자 관련 에러
    USERNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "USERNAME_ALREADY_EXISTS", "이미 존재하는 사용자명입니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS", "이미 존재하는 이메일입니다."),
    ACCOUNT_LOCKED(HttpStatus.FORBIDDEN, "ACCOUNT_LOCKED", "계정이 잠겨있습니다."),
    ACCOUNT_DEACTIVATED(HttpStatus.FORBIDDEN, "ACCOUNT_DEACTIVATED", "비활성화된 계정입니다."),

    // 권한 관련 에러
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "ACCESS_DENIED", "접근 권한이 없습니다."),
    INSUFFICIENT_PRIVILEGES(HttpStatus.FORBIDDEN, "INSUFFICIENT_PRIVILEGES", "권한이 부족합니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
