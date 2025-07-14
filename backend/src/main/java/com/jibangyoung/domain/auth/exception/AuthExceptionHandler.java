package com.jibangyoung.domain.auth.exception;

import com.jibangyoung.global.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ApiResponse<Object>> handleAuthException(AuthException ex) {
        // 상황별 에러코드에 따라 status 조절 가능
        return ResponseEntity
            .badRequest()
            .body(ApiResponse.fail(ex.getCode().name(), ex.getMessage()));
    }

    // 필요시 글로벌 예외/검증 예외도 통합 관리 가능
}
