// app/components/layout/Header.tsx
"use client";


import "@/styles/globals.css"; // ✅ 직접 import 가능
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const policyDropdownMenu = [
  { label: "로그인", path: "/auth" },
  { label: "아이디 찾기", path: "/auth/find-id" },
  { label: "비밀번호 찾기", path: "/auth/find-password" },
  { label: "비밀번호 재설정", path: "/auth/reset-password" },
  { label: "회원가입", path: "/signup" },
  { label: "대시보드", path: "/dashboard" },
  { label: "설문 응답", path: "/survey" },
  { label: "추천 결과", path: "/recommendation" },
  { label: "추천지역 상세", path: "/recommendation/detail" },
  { label: "정책 리스트", path: "/policy" },
//   { label: "정책 상세", path: "/policy/[id]" },
  { label: "찜한 정책", path: "/policy/favorites" },
  { label: "통합 검색", path: "/search" },
  { label: "커뮤니티 홈", path: "/community" },
  { label: "지역 게시판 상세", path: "/community/region" },
  { label: "게시글 상세", path: "/community/post" },
  { label: "멘토 신청", path: "/mentor" },
  { label: "공지 대시보드", path: "/notice" },
  { label: "공지 상세", path: "/notice/detail" },
  { label: "공지 작성", path: "/notice/new" },
  { label: "운영자 기능", path: "/admin/moderator" },
  { label: "마이페이지", path: "/mypage" },
  { label: "프로필 수정", path: "/mypage/profile" },
  { label: "신고 내역", path: "/mypage/reports" },
  { label: "관리자 페이지", path: "/admin" },
  { label: "신고 처리", path: "/admin/reports" }
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ESC 또는 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!dropdownOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [dropdownOpen]);

  return (
    <header>
      <div className="container">
        {/* 로고 */}
        <Link href="/" className="logo">
          지방청년
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav>
          <Link href="/community">커뮤니티</Link>
          <Link href="/recommendation">추천정책</Link>

          {/* 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="dropdown-button"
            >
              전체정책 ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {policyDropdownMenu.map((item) => (
                  <Link key={item.path} href={item.path}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* 로그인 버튼 */}
        <Link href="/auth" className="btn-primary">
          로그인
        </Link>
      </div>
    </header>
  );
}
