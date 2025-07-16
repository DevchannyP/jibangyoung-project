package com.jibangyoung.domain.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jibangyoung.domain.auth.dto.LoginRequestDto;
import com.jibangyoung.domain.auth.dto.LoginResponseDto;
import com.jibangyoung.domain.auth.dto.SignupRequestDto;
import com.jibangyoung.domain.auth.dto.UserDto;
import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserStatus;
import com.jibangyoung.domain.auth.repository.UserRepository;
import com.jibangyoung.global.exception.BusinessException;
import com.jibangyoung.global.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenService tokenService;

    public UserDto signup(SignupRequestDto signupRequest) {
        validateSignupRequest(signupRequest);

        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new BusinessException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = userService.createUser(signupRequest);
        log.info("새로운 사용자가 가입했습니다: {}", user.getUsername());

        return UserDto.from(user);
    }

    public LoginResponseDto login(LoginRequestDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByUsernameAndStatus(loginRequest.getUsername(), UserStatus.ACTIVE)
                    .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

            // 마지막 로그인 시간 업데이트
            userService.updateLastLogin(user);

            // 토큰 생성 및 관리
            LoginResponseDto loginResponse = tokenService.generateTokens(authentication, user);

            log.info("사용자 로그인 성공: {}", user.getUsername());
            return loginResponse;

        } catch (AuthenticationException e) {
            log.warn("로그인 실패: {}", loginRequest.getUsername());
            throw new BusinessException(ErrorCode.INVALID_LOGIN_CREDENTIALS);
        }
    }

    public LoginResponseDto refreshToken(String refreshToken) {
        return tokenService.refreshAccessToken(refreshToken);
    }

    public void logout(String refreshToken) {
        tokenService.revokeToken(refreshToken);
    }

    public void logoutAll(String username) {
        tokenService.revokeAllUserTokens(username);
    }

    private void validateSignupRequest(SignupRequestDto signupRequest) {
        if (!signupRequest.isPasswordMatching()) {
            throw new BusinessException(ErrorCode.PASSWORD_MISMATCH);
        }
    }
}
