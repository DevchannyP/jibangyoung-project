// backend/src/main/java/com/jibangyoung/domain/auth/dto/UserDto.java
package com.jibangyoung.domain.auth.dto;

import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserRole;
import com.jibangyoung.domain.auth.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
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
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .phone(user.getPhone())
                .role(user.getRole())
                .status(user.getStatus())
                .profileImageUrl(user.getProfileImageUrl())
                .birthDate(user.getBirthDate())
                .gender(user.getGender())
                .region(user.getRegion())
                .lastLoginAt(user.getLastLoginAt())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
