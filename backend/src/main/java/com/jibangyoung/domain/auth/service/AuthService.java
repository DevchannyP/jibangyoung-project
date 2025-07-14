package com.jibangyoung.domain.auth.service;

import com.jibangyoung.domain.auth.dto.LoginRequest;
import com.jibangyoung.domain.auth.dto.LoginTokenResponse;
import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.exception.AuthErrorCode;
import com.jibangyoung.domain.auth.exception.AuthException;
import com.jibangyoung.domain.auth.repository.UserRepository;
import com.jibangyoung.domain.auth.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    // 로그인(이메일/비밀번호)
    public LoginTokenResponse loginWithEmail(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new AuthException(AuthErrorCode.INVALID_CREDENTIAL));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException(AuthErrorCode.INVALID_CREDENTIAL);
        }
        String accessToken = jwtProvider.createAccessToken(user);
        String refreshToken = jwtProvider.createRefreshToken(user);
        Instant issuedAt = Instant.now();
        long expiresIn = 60 * 60L; // 1시간

        return LoginTokenResponse.of(
            accessToken,
            refreshToken,
            expiresIn,
            issuedAt,
            issuedAt.plusSeconds(expiresIn)
        );
    }

    // 리프레시 토큰 재발급
    public LoginTokenResponse refreshAccessToken(String refreshToken) {
        Long userId = jwtProvider.extractUserId(refreshToken);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new AuthException(AuthErrorCode.USER_NOT_FOUND));
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new AuthException(AuthErrorCode.INVALID_REFRESH_TOKEN);
        }
        String newAccessToken = jwtProvider.createAccessToken(user);
        String newRefreshToken = jwtProvider.createRefreshToken(user);
        Instant issuedAt = Instant.now();
        long expiresIn = 60 * 60L;

        return LoginTokenResponse.of(
            newAccessToken,
            newRefreshToken,
            expiresIn,
            issuedAt,
            issuedAt.plusSeconds(expiresIn)
        );
    }
}
