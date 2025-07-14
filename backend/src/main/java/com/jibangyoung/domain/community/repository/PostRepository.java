package com.jibangyoung.domain.community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jibangyoung.domain.community.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = """
            SELECT * FROM posts
            WHERE created_at >= NOW() - INTERVAL 7 DAY
            ORDER BY likes DESC
            LIMIT 10
            """, nativeQuery = true)
    List<Post> findTop10ByLikesInLastWeek();
}