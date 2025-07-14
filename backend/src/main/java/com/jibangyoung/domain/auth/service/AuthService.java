package com.jibangyoung.domain.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jibangyoung.domain.auth.dto.LoginRequest;
import com.jibangyoung.domain.auth.dto.LoginTokenResponse;
import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.exception.AuthErrorCode;
import com.jibangyoung.domain.auth.exception.AuthException;
import com.jibangyoung.domain.auth.repository.UserRepository;
import com.jibangyoung.domain.auth.util.JwtProvider;
import com.jibangyoung.global.util.jwt.JwtResolver;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

   public LoginTokenResponse loginWithEmail(LoginRequest request) {
  User user = userRepository.findByEmail(request.getEmail())
    .orElseThrow(() -> new AuthException(AuthErrorCode.INVALID_CREDENTIAL));

  if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
    throw new AuthException(AuthErrorCode.INVALID_CREDENTIAL);
  }

  return LoginTokenResponse.builder()
    .accessToken(jwtProvider.createAccessToken(user))
    .refreshToken(jwtProvider.createRefreshToken(user))
    .expiresIn(3600)
    .build();
}

public LoginTokenResponse refreshAccessToken(String bearerHeader) {
  String refreshToken = JwtResolver.extractBearerToken(bearerHeader);
  Long userId = jwtProvider.extractUserId(refreshToken);

  User user = userRepository.findById(userId)
    .orElseThrow(() -> new AuthException(AuthErrorCode.USER_NOT_FOUND));

  if (!jwtProvider.validateToken(refreshToken)) {
    throw new AuthException(AuthErrorCode.INVALID_REFRESH_TOKEN);
  }

  return LoginTokenResponse.builder()
    .accessToken(jwtProvider.createAccessToken(user))
    .refreshToken(jwtProvider.createRefreshToken(user))
    .expiresIn(3600)
    .build();
}

}