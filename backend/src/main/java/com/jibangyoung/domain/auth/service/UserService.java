package com.jibangyoung.domain.auth.service;

import com.jibangyoung.domain.auth.dto.*;
import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserStatus;
import com.jibangyoung.domain.auth.repository.UserRepository;
import com.jibangyoung.global.exception.BusinessException;
import com.jibangyoung.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원 생성 (회원가입)
    public User createUser(SignupRequestDto signupRequest) {
        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());
        User user = User.createUser(
            signupRequest.getUsername(),
            signupRequest.getEmail(),
            encodedPassword,
            signupRequest.getNickname(),
            signupRequest.getPhone(),
            signupRequest.getProfileImageUrl(),
            signupRequest.getBirthDate(),
            signupRequest.getGender(),
            signupRequest.getRegion()
        );
        return userRepository.save(user);
    }

    // 비밀번호 변경
    public void updateUserPassword(Long userId, PasswordUpdateRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }
        if (!dto.isNewPasswordMatching()) {
            throw new BusinessException(ErrorCode.PASSWORD_MISMATCH);
        }
        user.updatePassword(passwordEncoder.encode(dto.getNewPassword()));
        log.info("사용자 {} 비밀번호 변경 완료", user.getUsername());
    }

    // 마지막 로그인 갱신
    public void updateLastLogin(User user) {
        user.updateLastLogin();
        userRepository.save(user); // dirty checking으로 자동 반영 가능
    }

    // 프로필 업데이트
    public UserDto updateUserProfile(Long userId, String nickname, String phone, String profileImageUrl) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        user.updateProfile(nickname, phone, profileImageUrl);
        return UserDto.from(user);
    }

    // 탈퇴/비활성화/활성화
    public void deactivateUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        user.deactivate();
    }

    public void activateUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        user.activate();
    }

    // 조회 API
    @Transactional(readOnly = true)
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return UserDto.from(user);
    }

    // 중복 체크
    public boolean isUsernameAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }
}

