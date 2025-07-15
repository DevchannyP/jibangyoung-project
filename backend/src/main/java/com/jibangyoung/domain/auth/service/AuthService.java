package com.jibangyoung.domain.auth.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails; // ✅ 추가
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jibangyoung.domain.auth.AuthConstants;
import com.jibangyoung.domain.auth.dto.LoginRequestDto;
import com.jibangyoung.domain.auth.dto.LoginResponseDto;
import com.jibangyoung.domain.auth.dto.SignupRequestDto;
import com.jibangyoung.domain.auth.dto.UserDto;
import com.jibangyoung.domain.auth.entity.RefreshToken;
import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserStatus;
import com.jibangyoung.domain.auth.repository.RefreshTokenRepository;
import com.jibangyoung.domain.auth.repository.UserRepository;
import com.jibangyoung.domain.auth.security.CustomUserDetailsService; // ✅ 추가
import com.jibangyoung.domain.auth.security.JwtTokenProvider;
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
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService; // ✅ 추가
    
    public UserDto signup(SignupRequestDto signupRequest) {
        validateSignupRequest(signupRequest);
        
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new BusinessException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }
        
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        
        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .nickname(signupRequest.getNickname())
                .phone(signupRequest.getPhone())
                .birthDate(signupRequest.getBirthDate())
                .gender(signupRequest.getGender())
                .region(signupRequest.getRegion())
                .profileImageUrl(AuthConstants.DEFAULT_PROFILE_IMAGE)
                // UserRole과 UserStatus는 생성 시 기본값을 설정하거나 SignupRequestDto에 포함시켜야 합니다.
                // 현재 코드에서는 누락되어 있어 빌더 패턴 사용 시 초기화되지 않을 수 있습니다.
                // 여기서는 UserRole.USER와 UserStatus.ACTIVE로 가정하고 추가합니다.
                .role(com.jibangyoung.domain.auth.entity.UserRole.USER) // ✅ 역할 기본값 설정 (필요시 DTO에 추가)
                .status(com.jibangyoung.domain.auth.entity.UserStatus.ACTIVE) // ✅ 상태 기본값 설정
                .build();
        
        User savedUser = userRepository.save(user);
        log.info("새로운 사용자가 가입했습니다: {}", savedUser.getUsername());
        
        return UserDto.from(savedUser);
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
            user.updateLastLogin();
            
            // 기존 리프레시 토큰 정리 (사용자당 최대 토큰 수 제한)
            cleanupUserTokens(user);
            
            // 새로운 토큰 생성
            String accessToken = jwtTokenProvider.createAccessToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername());
            
            // 리프레시 토큰 저장
            RefreshToken refreshTokenEntity = RefreshToken.builder()
                    .token(refreshToken)
                    .user(user)
                    .expiresAt(jwtTokenProvider.getExpirationDateFromToken(refreshToken))
                    .build();
            
            refreshTokenRepository.save(refreshTokenEntity);
            
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime expiresAt = now.plusSeconds(jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000);
            
            log.info("사용자 로그인 성공: {}", user.getUsername());
            
            return LoginResponseDto.of(
                    user,
                    accessToken,
                    refreshToken,
                    jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000,
                    now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                    expiresAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            );
            
        } catch (AuthenticationException e) {
            log.warn("로그인 실패: {}", loginRequest.getUsername());
            throw new BusinessException(ErrorCode.INVALID_LOGIN_CREDENTIALS);
        }
    }
    
    public LoginResponseDto refreshToken(String refreshToken) {
        RefreshToken storedToken = refreshTokenRepository.findByTokenAndRevokedFalse(refreshToken)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));
        
        if (!storedToken.isValid()) {
            throw new BusinessException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }
        
        User user = storedToken.getUser();
        
        // CustomUserDetailsService를 통해 UserDetails 로드하여 권한 정보 포함
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername()); // ✅ 수정
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()); // ✅ 수정
        
        String newAccessToken = jwtTokenProvider.createAccessToken(authentication);
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusSeconds(jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000);
        
        return LoginResponseDto.of(
                user,
                newAccessToken,
                refreshToken,
                jwtTokenProvider.getAccessTokenValidityInMilliseconds() / 1000,
                now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                expiresAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }
    
    public void logout(String refreshToken) {
        RefreshToken storedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN));
        
        storedToken.revoke();
        refreshTokenRepository.save(storedToken);
        
        log.info("사용자 로그아웃: {}", storedToken.getUser().getUsername());
    }
    
    public void logoutAll(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        
        refreshTokenRepository.revokeAllByUser(user);
        log.info("사용자 모든 기기 로그아웃: {}", username);
    }
    
    private void validateSignupRequest(SignupRequestDto signupRequest) {
        if (!signupRequest.isPasswordMatching()) {
            throw new BusinessException(ErrorCode.PASSWORD_MISMATCH);
        }
    }
    
    private void cleanupUserTokens(User user) {
        long validTokenCount = refreshTokenRepository.countValidTokensByUser(user);
        if (validTokenCount >= AuthConstants.MAX_REFRESH_TOKENS_PER_USER) {
            refreshTokenRepository.revokeAllByUser(user);
        }
    }
}