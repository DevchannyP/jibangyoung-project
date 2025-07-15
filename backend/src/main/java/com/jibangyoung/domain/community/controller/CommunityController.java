package com.jibangyoung.domain.community.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jibangyoung.domain.community.service.CommunityService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api/community")
@NoArgsConstructor
@AllArgsConstructor
public class CommunityController {

    CommunityService communityService;

    // @GetMapping("/top-liked-week")
    // public List<PostListDto> getTop10PostsLastWeek() {
    // return communityService.getTop10PostsLastWeek();
    // }
}
