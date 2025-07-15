package com.jibangyoung.global.exception;

import lombok.extern.slf4j.Slf4j; // ✅ lombok.extern.slf4j.Slf4j 추가
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jibangyoung.global.common.ApiResponse;

@RestControllerAdvice
@Slf4j // ✅ @Slf4j 어노테이션 확인
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Object>> handleBusinessException(BusinessException e) {
        log.error("Business exception occurred: {}", e.getMessage(), e);
        ErrorCode errorCode = e.getErrorCode(); // getErrorCode()는 BusinessException에 @Getter가 있으면 자동 생성
        ApiResponse<Object> response = ApiResponse.error(errorCode.getMessage(), errorCode.getCode());
        return ResponseEntity.status(errorCode.getStatus()).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(MethodArgumentNotValidException e) {
        log.error("Validation exception occurred: {}", e.getMessage());
        String errorMessage = e.getBindingResult().getFieldError() != null ?
                e.getBindingResult().getFieldError().getDefaultMessage() : "유효성 검사 실패";
        ApiResponse<Object> response = ApiResponse.error(errorMessage, ErrorCode.INVALID_INPUT_VALUE.getCode());
        return ResponseEntity.status(ErrorCode.INVALID_INPUT_VALUE.getStatus()).body(response);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<Object>> handleMethodNotAllowed(HttpRequestMethodNotSupportedException e) {
        log.error("Bind exception occurred: {}", e.getMessage());
        ApiResponse<Object> response = ApiResponse.error(ErrorCode.METHOD_NOT_ALLOWED.getMessage(), ErrorCode.METHOD_NOT_ALLOWED.getCode());
        return ResponseEntity.status(ErrorCode.METHOD_NOT_ALLOWED.getStatus()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception e) {
        log.error("Unexpected exception occurred: {}", e.getMessage(), e);
        ApiResponse<Object> response = ApiResponse.error(ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.getCode());
        return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()).body(response);
    }
}