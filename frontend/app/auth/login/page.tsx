// app/(auth)/login/page.tsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";
import styles from "./LoginPage.module.css";

const AuthMascots = dynamic(() => import("./components/AuthMascots"), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <div className={styles.bgWrap}>
      <div className={styles.mascotFixed}>
        <AuthMascots />
      </div>

      <main className={styles.main}>
        <section className={styles.whiteSection}>
          <div className={styles.curveSection}></div>
          <div className={styles.loginSection}>
            <div className={styles.formContainer}>
              <LoginForm />
              <div className={styles.linkRow}>
                <Link href="/auth/find-id" className={styles.linkSm}>
                  아이디 찾기
                </Link>
                <Link href="/auth/find-password" className={styles.linkSm}>
                  비밀번호 재설정 하기
                </Link>
              </div>
              <div className={styles.dividerOr}>OR</div>
              <SocialLoginButtons />
              <div className={styles.bottomText}>
                계정이 없으신가요?{" "}
                <Link href="/auth/register" className={styles.linkSm}>
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
