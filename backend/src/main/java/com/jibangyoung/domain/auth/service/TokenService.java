package com.jibangyoung.domain.auth.service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jibangyoung.domain.auth.AuthConstants;
import com.jibangyoung.domain.auth.dto.LoginResponseDto;
import com.jibangyoung.domain.auth.entity.RefreshToken;
import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.repository.RefreshTokenRepository;
import com.jibangyoung.domain.auth.repository.UserRepository;
import com.jibangyoung.global.security.CustomUserDetailsService;
import com.jibangyoung.global.security.JwtTokenProvider;
import com.jibangyoung.global.exception.BusinessException;
import com.jibangyoung.global.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final Clock clock = Clock.systemDefaultZone();

    /**
     * 로그인/재발급 시, 유저당 토큰 갯수 제한, 기존 만료/폐기 토큰 정리
     */
    private void cleanupUserTokens(User user) {
        LocalDateTime now = LocalDateTime.now(clock);
        // 1. 만료 또는 폐기 토큰 삭제
        refreshTokenRepository.deleteUserExpiredAndRevokedTokens(user, now);

        // 2. 유효 토큰 갯수 제한 (최신순 보관, 초과분 폐기)
        List<RefreshToken> validTokens = refreshTokenRepository.findValidTokensByUser(user, now);
        int maxTokens = AuthConstants.MAX_REFRESH_TOKENS_PER_USER;
        if (validTokens.size() >= maxTokens) {
            for (int i = 0; i <= validTokens.size() - maxTokens; i++) {
                validTokens.get(i).revoke();
            }
            // flush 필요시 아래 saveAll 또는 @Transactional로 반영
            log.info("사용자 토큰 수 제한({}) 초과, 오래된 토큰들 revoke 처리", maxTokens);
        }
    }

    /**
     * 로그인/토큰 재발급 API에서 반드시 호출
     */
    public LoginResponseDto generateTokens(Authentication authentication, User user) {
        cleanupUserTokens(user);

        String accessToken = jwtTokenProvider.createAccessToken(authentication);
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername());
        LocalDateTime refreshExpiresAt = jwtTokenProvider.getExpirationDateFromToken(refreshToken);

        RefreshToken refreshTokenEntity = RefreshToken.create(refreshToken, user, refreshExpiresAt);
        refreshTokenRepository.save(refreshTokenEntity);

        LocalDateTime now = LocalDateTime.now(clock);
        LocalDateTime accessTokenExpiresAt = now.plusSeconds(jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000);

        return LoginResponseDto.of(
                user, accessToken, refreshToken,
                jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000,
                now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                accessTokenExpiresAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    // 리프레시 토큰 재발급/검증 등은 기존 코드와 동일
    public LoginResponseDto refreshAccessToken(String refreshToken) {
        RefreshToken storedToken = refreshTokenRepository.findByTokenAndRevokedFalse(refreshToken)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));

        if (!storedToken.isValid()) {
            throw new BusinessException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }

        User user = storedToken.getUser();
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        String newAccessToken = jwtTokenProvider.createAccessToken(authentication);

        LocalDateTime now = LocalDateTime.now(clock);
        LocalDateTime accessTokenExpiresAt = now.plusSeconds(jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000);

        return LoginResponseDto.of(
                user, newAccessToken, refreshToken,
                jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000,
                now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                accessTokenExpiresAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }

    // 명시적 로그아웃 → 토큰 폐기
    public void revokeToken(String refreshToken) {
        RefreshToken storedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));

        storedToken.revoke();
        log.info("토큰 무효화: 사용자 {}", storedToken.getUser().getUsername());
    }

    // 사용자 전체 로그아웃 (모든 RefreshToken revoke)
    public void revokeAllUserTokens(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        refreshTokenRepository.revokeAllByUser(user);
        log.info("사용자 모든 토큰 무효화: {}", username);
    }

    // 주기적 만료/폐기 토큰 DB 삭제 (스케줄러용)
    public void cleanupExpiredTokens() {
        refreshTokenRepository.deleteExpiredAndRevokedTokens(LocalDateTime.now(clock));
        log.info("만료·폐기된 토큰 정리 완료");
    }
}

