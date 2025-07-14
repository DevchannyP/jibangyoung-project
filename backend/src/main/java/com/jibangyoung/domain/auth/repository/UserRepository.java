package com.jibangyoung.domain.auth.repository;

import com.jibangyoung.domain.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 사용자 조회(논리삭제 제외)
    Optional<User> findByEmail(String email);

    // 이메일 중복 체크
    boolean existsByEmail(String email);

    // 닉네임 중복 체크
    boolean existsByNickname(String nickname);

    // 소셜 로그인 여부 포함 조회
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.isSocial = :isSocial")
    Optional<User> findByEmailAndIsSocial(@Param("email") String email, @Param("isSocial") boolean isSocial);

    // 탈퇴 포함 전체 조회
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findAnyByEmail(@Param("email") String email); // @Where 무시
}
