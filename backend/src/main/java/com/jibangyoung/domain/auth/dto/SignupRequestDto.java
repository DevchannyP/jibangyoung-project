package com.jibangyoung.domain.auth.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequestDto {

    @NotBlank(message = "사용자명을 입력해주세요.")
    @Size(min = 4, max = 50, message = "사용자명은 4~50자 사이여야 합니다.")
    @Pattern(regexp = "^[a-zA-Z0-9_-]+$", message = "사용자명은 영문, 숫자, 언더스코어, 하이픈만 사용 가능합니다.")
    private String username;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 형식을 입력해주세요.")
    @Size(max = 100, message = "이메일은 100자를 초과할 수 없습니다.")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 8, max = 100, message = "비밀번호는 8~100자 사이여야 합니다.")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$", // ✅ 이 부분 수정
        message = "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다."
    )
    private String password;

    @NotBlank(message = "비밀번호 확인을 입력해주세요.")
    private String passwordConfirm;

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 2, max = 50, message = "닉네임은 2~50자 사이여야 합니다.")
    private String nickname;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "올바른 전화번호 형식을 입력해주세요.")
    private String phone;

    private LocalDate birthDate;

    @Pattern(regexp = "^(남성|여성|기타)$", message = "성별은 '남성', '여성', '기타' 중 하나여야 합니다.")
    private String gender;

    @Size(max = 100, message = "지역은 100자를 초과할 수 없습니다.")
    private String region;

    /**
     * 비밀번호와 비밀번호 확인이 일치하는지 검증하는 메서드
     */
    public boolean isPasswordMatching() {
        return password != null && password.equals(passwordConfirm);
    }
}