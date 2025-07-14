package com.jibangyoung.domain.auth.dto;

import java.time.Instant;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "로그인 토큰 응답 DTO")
public class LoginTokenResponse {

  @Schema(description = "토큰 유형", example = "Bearer")
  private final String tokenType;

  @Schema(description = "액세스 토큰", example = "eyJhbGciOiJIUzI1NiIs...")
  private final String accessToken;

  @Schema(description = "리프레시 토큰", example = "eyJhbGciOiJIUzI1NiIs...")
  private final String refreshToken;

  @Schema(description = "만료까지 남은 시간 (초)", example = "3600")
  private final long expiresIn;

  @Schema(description = "발급 시각", example = "2025-07-14T15:00:00Z")
  private final Instant issuedAt;

  @Schema(description = "만료 시각", example = "2025-07-14T16:00:00Z")
  private final Instant expiresAt;

  // 생성자 (Builder 전용)
  
  private LoginTokenResponse(Builder builder) {
    this.tokenType = builder.tokenType;
    this.accessToken = builder.accessToken;
    this.refreshToken = builder.refreshToken;
    this.expiresIn = builder.expiresIn;
    this.issuedAt = builder.issuedAt;
    this.expiresAt = builder.expiresAt;
  }

  // Builder 정의
  public static class Builder {
    private String tokenType = "Bearer"; // 기본값 설정
    private String accessToken;
    private String refreshToken;
    private long expiresIn;
    private Instant issuedAt;
    private Instant expiresAt;

    public Builder accessToken(String accessToken) {
      this.accessToken = accessToken;
      return this;
    }

    public Builder refreshToken(String refreshToken) {
      this.refreshToken = refreshToken;
      return this;
    }

    public Builder expiresIn(long expiresIn) {
      this.expiresIn = expiresIn;
      return this;
    }

    public Builder issuedAt(Instant issuedAt) {
      this.issuedAt = issuedAt;
      return this;
    }

    public Builder expiresAt(Instant expiresAt) {
      this.expiresAt = expiresAt;
      return this;
    }

    public LoginTokenResponse build() {
      return new LoginTokenResponse(this);
    }
  }

  // Getters (생략하거나 필요에 따라 Lombok 등 활용 가능)
  public String getTokenType() {
    return tokenType;
  }

  public String getAccessToken() {
    return accessToken;
  }

  public String getRefreshToken() {
    return refreshToken;
  }

  public long getExpiresIn() {
    return expiresIn;
  }

  public Instant getIssuedAt() {
    return issuedAt;
  }

  public Instant getExpiresAt() {
    return expiresAt;
  }
}
