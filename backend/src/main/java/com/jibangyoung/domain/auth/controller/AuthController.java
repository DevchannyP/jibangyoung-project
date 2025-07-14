package com.jibangyoung.domain.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jibangyoung.domain.auth.dto.LoginRequest;
import com.jibangyoung.domain.auth.dto.LoginTokenResponse;
import com.jibangyoung.domain.auth.service.AuthService;
import com.jibangyoung.global.dto.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/email-login")
  @Operation(summary = "이메일 로그인", description = "이메일/비밀번호로 로그인하여 액세스/리프레시 토큰을 발급받습니다.")
  public ResponseEntity<ApiResponse<LoginTokenResponse>> login(
    @Valid @RequestBody LoginRequest request
  ) {
    LoginTokenResponse tokens = authService.loginWithEmail(request);
    return ResponseEntity.ok(ApiResponse.success(tokens));
  }

  @PostMapping("/refresh")
  @Operation(summary = "리프레시 토큰 재발급", description = "만료된 액세스 토큰을 리프레시 토큰을 통해 재발급합니다.")
  public ResponseEntity<ApiResponse<LoginTokenResponse>> refresh(
    @Parameter(description = "Bearer {refreshToken} 형식의 리프레시 토큰", required = true)
    @RequestHeader("Authorization") String refreshHeader
  ) {
    String refreshToken = parseBearerToken(refreshHeader);
    LoginTokenResponse tokens = authService.refreshAccessToken(refreshToken);
    return ResponseEntity.ok(ApiResponse.success(tokens));
  }

  private String parseBearerToken(String header) {
    if (header != null && header.startsWith("Bearer ")) {
      return header.substring(7);
    }
    throw new IllegalArgumentException("Invalid Authorization header");
  }
}
