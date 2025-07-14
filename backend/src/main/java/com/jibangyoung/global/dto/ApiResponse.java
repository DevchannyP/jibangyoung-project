package com.jibangyoung.global.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "API 공통 응답")
public class ApiResponse<T> {

    @Schema(description = "요청 성공 여부", example = "true")
    private boolean success;

    @Schema(description = "응답 데이터")
    private T data;

    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.success = true;
        response.data = data;
        return response;
    }

    // 실패 응답도 추가 가능 (예: error 메시지 포함)
}

