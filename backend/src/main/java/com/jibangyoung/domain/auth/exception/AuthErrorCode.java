package com.jibangyoung.domain.auth.exception;

public enum AuthErrorCode {
  INVALID_CREDENTIAL("이메일 또는 비밀번호가 일치하지 않습니다."),
  USER_NOT_FOUND("사용자를 찾을 수 없습니다."),
  INVALID_REFRESH_TOKEN("리프레시 토큰이 유효하지 않습니다.");

  private final String message;
  AuthErrorCode(String message) { this.message = message; }
  public String getMessage() { return message; }
}


