package com.jibangyoung.global.util.jwt;

import com.jibangyoung.domain.auth.exception.AuthErrorCode;
import com.jibangyoung.domain.auth.exception.AuthException;

public class JwtResolver {
  public static String extractBearerToken(String header) {
    if (header != null && header.startsWith("Bearer ")) {
      return header.substring(7);
    }
    throw new AuthException(AuthErrorCode.INVALID_REFRESH_TOKEN);
  }
}

