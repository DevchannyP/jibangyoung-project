package com.jibangyoung.domain.community.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jibangyoung.domain.community.dto.PostListDto;
import com.jibangyoung.domain.community.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<PostListDto> getTop10PostsLastWeek() {
        return postRepository.findTop10ByLikesInLastWeek().stream()
                .map(post -> PostListDto.builder()
                        .title(post.getTitle())
                        .likes(post.getLikes())
                        .views(post.getViews())
                        .createdAt(post.getCreatedAt())
                        .userId(post.getUserId())
                        .reginId(post.getRegionId())
                        .build())
                .toList();
    }
}