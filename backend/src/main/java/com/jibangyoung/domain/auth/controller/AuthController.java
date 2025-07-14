package com.jibangyoung.domain.auth.controller;

import com.jibangyoung.domain.auth.dto.LoginRequest;
import com.jibangyoung.domain.auth.dto.LoginTokenResponse;
import com.jibangyoung.domain.auth.service.AuthService;
import com.jibangyoung.global.dto.ApiResponse;
import com.jibangyoung.global.util.jwt.JwtResolver;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/email-login")
    @Operation(summary = "이메일 로그인", description = "이메일/비밀번호로 로그인, JWT 토큰 발급")
    public ResponseEntity<ApiResponse<LoginTokenResponse>> login(
        @Valid @RequestBody LoginRequest request
    ) {
        LoginTokenResponse tokens = authService.loginWithEmail(request);
        return ResponseEntity.ok(ApiResponse.success(tokens));
    }

    @PostMapping("/refresh")
    @Operation(summary = "리프레시 토큰 재발급", description = "리프레시 토큰으로 액세스 토큰 재발급")
    public ResponseEntity<ApiResponse<LoginTokenResponse>> refresh(
        @Parameter(description = "Bearer {refreshToken} 형식", required = true)
        @RequestHeader("Authorization") String refreshHeader
    ) {
        String refreshToken = JwtResolver.extractBearerToken(refreshHeader);
        LoginTokenResponse tokens = authService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success(tokens));
    }
}
