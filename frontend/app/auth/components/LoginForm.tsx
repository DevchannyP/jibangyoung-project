"use client";

import { loginWithEmail } from "@/libs/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styles from "../LoginPage.module.css";

export default function LoginForm() {
  const { setUser } = useAuthStore();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const loginMutation = useMutation({
    mutationFn: () => loginWithEmail(userid.trim(), password),
    onSuccess: (res) => {
      const user = {
        ...res.user,
        nickname: res.user.nickname ?? "",
      };
      setUser(user);
      window.location.href = "/dashboard";
    },
    onError: (err: any) => {
      setError(
        typeof err?.message === "string"
          ? err.message
          : "아이디 또는 비밀번호가 올바르지 않습니다."
      );
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <form
      className={styles.formContainer}
      autoComplete="on"
      aria-label="로그인 입력 폼"
      onSubmit={handleSubmit}
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
        maxLength={50}
        onKeyDown={handleKeyDown}
      />

      <div className={styles.passwordWrapper}>
        <input
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          aria-label="비밀번호"
          required
          maxLength={50}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPw((v) => !v)}
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
        >
          {showPw ? "숨김" : "보기"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", fontSize: "0.75rem" }} role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !isFormValid}
        aria-disabled={isPending || !isFormValid}
        className={styles.loginButton}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
