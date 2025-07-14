"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        {/* ✅ 좌측: 저작권 및 개인정보처리방침 */}
        <div className="copyright">
          <span>&copy; 지방청년 플랫폼</span>
          <Link href="/policy">개인정보처리방침</Link>
        </div>

        {/* ✅ 우측: 링크 모음 */}
        <div className="links">
          <Link href="/policy">전체 정책</Link>
          <Link href="/recommendation">추천 정책</Link>
          <Link href="/community">커뮤니티</Link>
          <Link href="/mentor">멘토 공지</Link>
          <Link href="/admin">관리자</Link>
        </div>
      </div>
    </footer>
  );
}
