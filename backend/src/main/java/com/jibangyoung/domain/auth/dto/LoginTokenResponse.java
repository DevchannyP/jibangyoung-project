package com.jibangyoung.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.Instant;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Schema(description = "로그인 토큰 응답 DTO")
public class LoginTokenResponse {

    @Schema(description = "토큰 유형", example = "Bearer")
    private String tokenType;

    @Schema(description = "액세스 토큰", example = "eyJhbGciOiJIUzI1NiIs...")
    private String accessToken;

    @Schema(description = "리프레시 토큰", example = "eyJhbGciOiJIUzI1NiIs...")
    private String refreshToken;

    @Schema(description = "만료까지 남은 시간(초)", example = "3600")
    private long expiresIn;

    @Schema(description = "발급 시각", example = "2025-07-14T15:00:00Z")
    private Instant issuedAt;

    @Schema(description = "만료 시각", example = "2025-07-14T16:00:00Z")
    private Instant expiresAt;

    // Builder 기반 생성 메서드(실무 추천)
    public static LoginTokenResponse of(
            String accessToken,
            String refreshToken,
            long expiresIn,
            Instant issuedAt,
            Instant expiresAt
    ) {
        return LoginTokenResponse.builder()
            .tokenType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .expiresIn(expiresIn)
            .issuedAt(issuedAt)
            .expiresAt(expiresAt)
            .build();
    }
}
