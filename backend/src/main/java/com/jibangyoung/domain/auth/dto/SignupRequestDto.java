package com.jibangyoung.domain.auth.dto;

import com.jibangyoung.domain.auth.AuthConstants;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequestDto {

    @NotBlank(message = "사용자명을 입력해주세요.")
    @Size(min = AuthConstants.USERNAME_MIN_LENGTH, max = AuthConstants.USERNAME_MAX_LENGTH)
    private String username;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = AuthConstants.PASSWORD_MIN_LENGTH, max = AuthConstants.PASSWORD_MAX_LENGTH, message = AuthConstants.PASSWORD_MESSAGE)
    @Pattern(regexp = AuthConstants.PASSWORD_REGEX, message = AuthConstants.PASSWORD_MESSAGE)
    private String password;

    @NotBlank(message = "비밀번호 확인을 입력해주세요.")
    private String passwordConfirm;

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 2, max = 50)
    private String nickname;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "올바른 전화번호 형식입니다.")
    private String phone;

    private String profileImageUrl;

    private LocalDate birthDate;

    private String gender;

    private String region;

    // 유효성 검증
    public boolean isPasswordMatching() {
        return password != null && password.equals(passwordConfirm);
    }
}

