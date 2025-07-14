package com.jibangyoung.domain.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "로그인 요청 DTO")
public class LoginRequest {

  @NotBlank
  @Email
  @Schema(description = "사용자 이메일", example = "user@example.com")
  private final String email;

  @NotBlank
  @Schema(description = "비밀번호", example = "12345678")
  private final String password;

  private LoginRequest(Builder builder) {
    this.email = builder.email;
    this.password = builder.password;
  }

  public static class Builder {
    private String email;
    private String password;

    public Builder email(String email) {
      this.email = email;
      return this;
    }

    public Builder password(String password) {
      this.password = password;
      return this;
    }

    public LoginRequest build() {
      return new LoginRequest(this);
    }
  }

  // Getter
  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }
}
