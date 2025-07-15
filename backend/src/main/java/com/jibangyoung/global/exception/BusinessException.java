package com.jibangyoung.global.exception;

import lombok.Getter;

/**
 * 비즈니스 로직 예외 처리용 커스텀 예외 클래스.
 * ErrorCode enum과 함께 사용되어 명확한 에러 메시지와 상태 코드 전달 가능.
 */
@Getter // ✅ errorCode 필드에 대한 Getter 자동 생성
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;

    // 기본 생성자: ErrorCode의 메시지를 Exception 메시지로 사용
    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    // 커스텀 메시지를 별도로 지정할 수 있는 생성자
    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    // cause(원인 예외)까지 포함할 수 있는 생성자
    public BusinessException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    // Lombok의 @Getter가 자동으로 아래 메서드를 생성함:
    // public ErrorCode getErrorCode() {
    //     return errorCode;
    // }
}
