package com.jibangyoung.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 📌 시스템 전역 에러 코드 정의
 * - 도메인별로 그룹화하여 코드 유지보수성과 가독성 향상
 * - HttpStatus, 커스텀 코드, 사용자 메시지를 포함함
 */
@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // ==========================
    // ⚙️ 공통 에러 (COMMON)
    // ==========================
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "COMMON001", "내부 서버 오류가 발생했습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "COMMON002", "허용되지 않은 HTTP 메서드입니다."),
    BIND_ERROR(HttpStatus.BAD_REQUEST, "COMMON003", "요청 데이터 바인딩에 실패했습니다."),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "COMMON004", "입력값이 유효하지 않습니다."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "COMMON005", "접근이 거부되었습니다."),

    // ==========================
    // 🔐 인증 관련 에러 (AUTH)
    // ==========================
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "AUTH001", "사용자를 찾을 수 없습니다."),
    USERNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "AUTH002", "이미 존재하는 사용자명입니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "AUTH003", "이미 존재하는 이메일입니다."),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "AUTH004", "비밀번호가 일치하지 않습니다."),
    INVALID_LOGIN_CREDENTIALS(HttpStatus.UNAUTHORIZED, "AUTH005", "잘못된 로그인 정보입니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH006", "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "AUTH007", "만료된 리프레시 토큰입니다."),
    ACCOUNT_DEACTIVATED(HttpStatus.FORBIDDEN, "AUTH008", "비활성화된 계정입니다.");

    // ==========================
    // 🧾 공통 필드 정의
    // ==========================
    private final HttpStatus status; // ⛳ HTTP 상태 코드
    private final String code;       // 🆔 시스템 고유 에러 코드 (ex: AUTH001)
    private final String message;    // 📢 사용자에게 전달할 메시지
}
