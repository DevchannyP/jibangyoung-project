package com.jibangyoung.global.security;

import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserRole;
import com.jibangyoung.domain.auth.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * User 엔티티 → Spring Security의 UserDetails로 변환 담당
 * (직접적으로 비밀번호 비교 로직 없음! 단순 정보 제공만)
 */
@Getter
@AllArgsConstructor
public class CustomUserPrincipal implements UserDetails {

    private final Long id;
    private final String username;
    private final String password; // 인코딩된 비번만 전달
    private final UserRole role;
    private final UserStatus status;
    private final Collection<? extends GrantedAuthority> authorities;

    // User 엔티티를 Security 인증용 객체로 변환
    public static CustomUserPrincipal create(User user) {
        return new CustomUserPrincipal(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getRole(),
                user.getStatus(),
                List.of(user.getRole().toGrantedAuthority()) // 여러 권한 확장 가능!
        );
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return status != UserStatus.SUSPENDED; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return status == UserStatus.ACTIVE; }
}

