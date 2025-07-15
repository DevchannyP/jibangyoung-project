"use client";

import { loginWithEmail } from "@/libs/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../LoginPage.module.css";

export default function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
    return () => setError("");
  }, []);

  const loginMutation = useMutation({
    mutationFn: () => loginWithEmail(userid.trim(), password),
    retry: false,
    onSuccess: (res) => {
      setUser({ ...res.user, nickname: res.user.nickname ?? "" });
      router.push("/dashboard"); // ✅ CSR 방식 리다이렉션
    },
    onError: (err: any) => {
      if (err?.response?.status === 401) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setError("일시적인 오류입니다. 잠시 후 다시 시도해주세요.");
      }

      if (process.env.NODE_ENV === "development") {
        console.error("로그인 실패:", err);
      }
    },
  });

  const isIdValid = userid.trim().length >= 4;
  const isPwValid = password.length >= 4;
  const isFormValid = isIdValid && isPwValid;
  const isPending = loginMutation.status === "pending";

  const handleLogin = () => {
    if (!isPending && isFormValid) {
      setError("");
      loginMutation.mutate();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form
      className={styles.formContainer}
      autoComplete="on"
      aria-label="로그인 입력 폼"
      onSubmit={handleSubmit}
      style={{ gap: 0 }}
    >
      <input
        ref={inputRef}
        type="text"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
        placeholder="아이디를 입력하세요"
        autoComplete="username"
        aria-label="아이디"
        required
        className={styles.inputField}
        minLength={4}
        maxLength={50}
        disabled={isPending}
        style={{ marginBottom: "14px" }}
      />

      <div style={{ position: "relative", marginBottom: "18px" }}>
        <input
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          aria-label="비밀번호"
          required
          className={styles.inputField}
          minLength={4}
          maxLength={50}
          disabled={isPending}
          style={{ marginBottom: 0, paddingRight: "64px" }}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPw((prev) => !prev)}
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
          className={styles.showPwBtn}
          disabled={isPending}
          style={{
            position: "absolute",
            right: 4,
            top: 0,
            height: "100%",
            fontWeight: 500,
          }}
        >
          {showPw ? "숨김" : "보기"}
        </button>
      </div>

      {error && (
        <div className={styles.errorMsg} role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !isFormValid}
        aria-disabled={isPending || !isFormValid}
        className={styles.loginButton}
        tabIndex={0}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
