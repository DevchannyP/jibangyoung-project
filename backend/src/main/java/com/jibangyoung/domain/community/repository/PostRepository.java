package com.jibangyoung.domain.community.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.jibangyoung.domain.community.dto.PostListDto;
import org.springdoc.core.converters.models.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jibangyoung.domain.community.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("""
                SELECT p FROM Post p
                WHERE p.createdAt >= :oneWeekAgo
                ORDER BY p.likes DESC
            """)
    List<PostListDto> findTop10ByLikesInLastWeek(@Param("oneWeekAgo") LocalDateTime oneWeekAgo, Pageable pageable);
}