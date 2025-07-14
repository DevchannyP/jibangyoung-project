package com.jibangyoung.domain.community.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jibangyoung.domain.community.dto.PostListDto;
import com.jibangyoung.domain.community.service.CommunityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/top-liked-week")
    public List<PostListDto> getTop10PostsLastWeek() {
        return communityService.getTop10PostsLastWeek();
    }
}
