package com.jibangyoung.domain.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jibangyoung.domain.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 이메일로 사용자 조회 (논리 삭제된 유저 제외)
     */
    Optional<User> findByEmail(String email);

    /**
     * 이메일 존재 여부 확인 (중복 검사에 활용)
     */
    boolean existsByEmail(String email);

    /**
     * 닉네임 중복 체크 (닉네임 변경/가입 시)
     */
    boolean existsByNickname(String nickname);

    /**
     * 소셜 여부 포함 조회 (소셜 로그인 시 식별)
     */
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.isSocial = :isSocial")
    Optional<User> findByEmailAndIsSocial(@Param("email") String email, @Param("isSocial") boolean isSocial);

    /**
     * 탈퇴 포함 전체 조회 (관리자 페이지 등에서 사용)
     */
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findAnyByEmail(@Param("email") String email); // @Where 무시하고 조회
}
