"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../Community.module.css";

interface PopularPost {
  id: number;
  title: string;
  author: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  category: string;
  region?: string;
}

// 임시로 사용할 샘플 데이터
const mockWeeklyPosts: PopularPost[] = [
  {
    id: 11,
    title: "인천혜택요. 한가를 받나다-",
    author: "인천청년",
    viewCount: 3847,
    likeCount: 256,
    commentCount: 63,
    createdAt: "2024-07-15T09:30:00Z",
    category: "정책후기",
    region: "인천",
  },
  {
    id: 12,
    title: "인천혜택요. 한가를 받나다-",
    author: "인천거주자",
    viewCount: 2923,
    likeCount: 189,
    commentCount: 52,
    createdAt: "2024-07-15T14:20:00Z",
    category: "정책정보",
    region: "인천",
  },
  {
    id: 13,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천청년",
    viewCount: 2654,
    likeCount: 172,
    commentCount: 48,
    createdAt: "2024-07-15T11:45:00Z",
    category: "생활정보",
    region: "인천",
  },
  {
    id: 14,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천살이",
    viewCount: 2432,
    likeCount: 163,
    commentCount: 41,
    createdAt: "2024-07-15T16:10:00Z",
    category: "정책정보",
    region: "인천",
  },
  {
    id: 15,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천드림",
    viewCount: 2298,
    likeCount: 154,
    commentCount: 37,
    createdAt: "2024-07-15T13:25:00Z",
    category: "정책정보",
    region: "인천",
  },
  {
    id: 16,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천청년",
    viewCount: 2156,
    likeCount: 145,
    commentCount: 33,
    createdAt: "2024-07-15T10:15:00Z",
    category: "생활정보",
    region: "인천",
  },
  {
    id: 17,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천이주자",
    viewCount: 2089,
    likeCount: 137,
    commentCount: 29,
    createdAt: "2024-07-15T15:30:00Z",
    category: "정책정보",
    region: "인천",
  },
  {
    id: 18,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천러버",
    viewCount: 1987,
    likeCount: 128,
    commentCount: 25,
    createdAt: "2024-07-15T12:40:00Z",
    category: "정책정보",
    region: "인천",
  },
  {
    id: 19,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천바다",
    viewCount: 1876,
    likeCount: 122,
    commentCount: 23,
    createdAt: "2024-07-15T17:20:00Z",
    category: "정책정보",
    region: "인천",
  },
  {
    id: 20,
    title: "인천혜택요. 기존과 받나다-",
    author: "인천청년",
    viewCount: 1765,
    likeCount: 119,
    commentCount: 21,
    createdAt: "2024-07-15T08:50:00Z",
    category: "정책정보",
    region: "인천",
  },
];

const WeeklyPopularPosts: React.FC = () => {
  const [posts, setPosts] = useState<PopularPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      // API 호출 대신 mock 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPosts(mockWeeklyPosts);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const handlePostClick = (id: number) => {
    router.push(`/community/posts/${id}`);
  };

  return (
    <div className={styles["popular-card"]}>
      <div className={styles["popular-card-header"]}>
        <h3>주간 인기 TOP10</h3>
        <span className={styles["icon"]}>{loading ? "⌛" : "👍"}</span>
      </div>

      <ul className={styles["popular-list"]}>
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <li key={idx}>
                <div className={styles["rank"]} />
                <div className={styles["title"]}>
                  <div className={styles["title"]}>&nbsp;</div>
                </div>
                <div className={styles["stats"]}>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                </div>
              </li>
            ))
          : posts.map((post, idx) => (
              <li key={post.id} onClick={() => handlePostClick(post.id)}>
                <div className={styles["rank"]}>{idx + 1}</div>
                <div className={styles["title"]}>{post.title}</div>
                <div className={styles["stats"]}>
                  <span>👁️ {post.viewCount}</span>
                  <span>👍 {post.likeCount}</span>
                  <span>💬 {post.commentCount}</span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default WeeklyPopularPosts;
