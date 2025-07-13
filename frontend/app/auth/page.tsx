// app/auth/page.tsx
"use client";

import Link from "next/link";
import AuthMascots from "./components/AuthMascots";
import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      {/* 🟨 상단 노란 배경 */}
      <section className={styles.topSection} />

      {/* 🐱 마스코트 이미지 - 배경 중간에 위치 */}
      <div className={styles.mascotOverlay}>
        <AuthMascots />
      </div>

      {/* ⬜ 로그인 섹션 - 정중앙 */}
      <section className={styles.loginSection}>
        <div className={styles.formContainer}>
          <LoginForm />

          <div className={styles.linkRow}>
            <Link href="/auth/find-id" className={styles.linkSm}>아이디 찾기</Link>
            <Link href="/auth/find-password" className={styles.linkSm}>비밀번호 재설정 하기</Link>
          </div>

          <div className={styles.dividerOr}>OR</div>
          <SocialLoginButtons />

          <div className={styles.bottomText}>
            계정이 없으신가요? <Link href="/auth/register" className={styles.linkSm}>회원가입</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
