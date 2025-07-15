// app/community/page.tsx
import styles from "./Community.module.css";
import WeeklyPopularPosts from "./components/WeeklyPopularPosts";

export const metadata = {
  title: "커뮤니티 - 인기 게시글",
  description:
    "일간 및 주간 인기 게시글을 확인할 수 있는 커뮤니티 페이지입니다.",
};

export default function CommunityPage() {
  return (
    // ① 페이지 전체 배경을 담당
    <main className={styles["community-container"]}>
      {/* ② 실제 콘텐츠 래퍼 */}
      <div>
        {/* 페이지 헤더 */}
        <header className={styles["community-header"]}>
          <h1>인기 게시글</h1>
          <p>일간 및 주간 인기 게시글을 확인하세요</p>
        </header>
        {/* 인기글 섹션 */}
        <section className={styles["popular-section"]}>
          <div>
            <WeeklyPopularPosts />
          </div>
          <div>
            <WeeklyPopularPosts />
          </div>
        </section>
      </div>
    </main>
  );
}
