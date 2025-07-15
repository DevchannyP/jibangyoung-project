package com.jibangyoung.domain.community.service;

import org.springframework.stereotype.Service;

import com.jibangyoung.domain.community.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private PostRepository postRepository;

    // @Transactional(readOnly = true)
    // public List<PostListDto> getTop10PostsLastWeek() {
    // return postRepository.findTop10ByLikesInLastWeek(); // ✅ 변환 없이 그대로 반환
    // }

}