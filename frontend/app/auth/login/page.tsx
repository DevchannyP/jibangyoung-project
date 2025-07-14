"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import styles from "./LoginPage.module.css";

const AuthMascots = dynamic(() => import("./components/AuthMascots"), { ssr: false, loading: () => <div style={{height:180}} /> });
const LoginForm = dynamic(() => import("./components/LoginForm"), { ssr: false });
const SocialLoginButtons = dynamic(() => import("./components/SocialLoginButtons"), { ssr: false });

export default function LoginPage() {
  return (
    <div className={styles.bgWrap}>
      {/* 마스코트는 흰색영역 위에(밖에) 절대 위치! */}
      <div className={styles.mascotFixed}>
        <Suspense fallback={<div style={{height:180}} />}><AuthMascots /></Suspense>
      </div>
      <main className={styles.main}>
        {/* 흰색 전체 영역 - 아래로 충분히 내려서 곡선 시작점 맞춤 */}
        <section className={styles.whiteSection}>
          <div className={styles.curveSection}></div>
          <div className={styles.loginSection}>
            <div className={styles.formContainer}>
              <LoginForm />
              <div className={styles.linkRow}>
                <a href="/auth/find-id" className={styles.linkSm}>아이디 찾기</a>
                <a href="/auth/find-password" className={styles.linkSm}>비밀번호 재설정 하기</a>
              </div>
              <div className={styles.dividerOr}>OR</div>
              <SocialLoginButtons />
              <div className={styles.bottomText}>
                계정이 없으신가요? <a href="/auth/register" className={styles.linkSm}>회원가입</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
