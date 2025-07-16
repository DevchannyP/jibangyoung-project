package com.jibangyoung.domain.auth.dto;

import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserRole;
import com.jibangyoung.domain.auth.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String username;
    private String email;
    private String nickname;
    private String phone;
    private UserRole role;
    private UserStatus status;
    private String profileImageUrl;
    private LocalDate birthDate;
    private String gender;
    private String region;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserDto from(User user) {
        if (user == null) return null;
        return UserDto.builder()
                .id(safe(user.getId()))
                .username(safe(user.getUsername()))
                .email(safe(user.getEmail()))
                .nickname(safe(user.getNickname()))
                .phone(safe(user.getPhone()))
                .role(safe(user.getRole()))
                .status(safe(user.getStatus()))
                .profileImageUrl(safe(user.getProfileImageUrl()))
                .birthDate(safe(user.getBirthDate()))
                .gender(safe(user.getGender()))
                .region(safe(user.getRegion()))
                .lastLoginAt(safe(user.getLastLoginAt()))
                .createdAt(safe(user.getCreatedAt()))
                .updatedAt(safe(user.getUpdatedAt()))
                // 연관관계(refreshTokens)는 직접 노출 X (필요 시 별도 DTO 변환)
                .build();
    }
    private static <T> T safe(T value) { return value == null ? null : value; }
}

