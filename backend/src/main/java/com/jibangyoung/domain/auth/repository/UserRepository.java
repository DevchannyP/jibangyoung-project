// backend/src/main/java/com/jibangyoung/domain/auth/repository/UserRepository.java
package com.jibangyoung.domain.auth.repository;

import com.jibangyoung.domain.auth.entity.User;
import com.jibangyoung.domain.auth.entity.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameAndStatus(String username, UserStatus status);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.status = :status AND u.lastLoginAt < :date")
    List<User> findInactiveUsers(@Param("status") UserStatus status, @Param("date") LocalDateTime date);

    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :startDate AND u.createdAt < :endDate")
    long countUsersByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
