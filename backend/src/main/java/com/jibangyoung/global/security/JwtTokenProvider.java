package com.jibangyoung.global.security;

import com.jibangyoung.domain.auth.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.access-token-validity-ms}")
    private long accessTokenValidityInMilliseconds;

    @Value("${jwt.refresh-token-validity-ms}")
    private long refreshTokenValidityInMilliseconds;

    private final CustomUserDetailsService userDetailsService;

    // 액세스 토큰 생성
    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenValidityInMilliseconds);
        String username = authentication.getName();

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    // 리프레시 토큰 생성
    public String createRefreshToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + refreshTokenValidityInMilliseconds);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    // 토큰에서 유저명 추출
    public String getUsernameFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    // 토큰 만료일 반환 (LocalDateTime)
    public LocalDateTime getExpirationDateFromToken(String token) {
        Claims claims = parseClaims(token);
        Date exp = claims.getExpiration();
        return LocalDateTime.ofInstant(exp.toInstant(), ZoneId.systemDefault());
    }

    // 토큰 유효성 체크 (검증)
    public boolean validateToken(String token) {
        try {
            parseClaims(token); // 예외 발생시 catch
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // 인증 객체 생성 (Spring Security 연동)
    public Authentication getAuthentication(String token) {
        String username = getUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities()
        );
    }

    // 클레임 파싱(내부전용)
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }

    public long getAccessTokenValidityInMilliseconds() {
        return accessTokenValidityInMilliseconds;
    }
}

