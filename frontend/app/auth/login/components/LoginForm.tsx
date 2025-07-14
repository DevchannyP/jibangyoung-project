import { loginWithEmail } from "@/libs/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styles from "../LoginPage.module.css";

export default function LoginForm() {
  // 🔽 setUser를 selector 패턴으로 불러옴 (Zustand 공식 추천)
  const setUser = useAuthStore((state) => state.setUser);
  // ...아래는 동일
  const [userid, setUserid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    return () => setError("");
  }, []);

  const loginMutation = useMutation({
    mutationFn: () => loginWithEmail(userid.trim(), password),
    onSuccess: (res) => {
      setUser({ ...res.user, nickname: res.user.nickname ?? "" });
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

  // ...아래 생략, 동일하게 유지



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
      style={{ gap: 0 }} // 인풋, 버튼 직접 여백 적용
    >
      {/* 아이디 입력 */}
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
        minLength={4}
        className={styles.inputField}
        style={{ marginBottom: "14px" }}
      />

      {/* 비밀번호 입력 + 보기 버튼 */}
      <div style={{ position: "relative", marginBottom: "18px" }}>
        <input
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          aria-label="비밀번호"
          required
          maxLength={50}
          minLength={4}
          className={styles.inputField}
          style={{ marginBottom: 0, paddingRight: "64px" }}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPw((v) => !v)}
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
          className={styles.showPwBtn}
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

      {/* 에러 메시지 */}
      {error && (
        <div className={styles.errorMsg} role="alert">
          {error}
        </div>
      )}

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isPending || !isFormValid}
        aria-disabled={isPending || !isFormValid}
        className={styles.loginButton}
        tabIndex={0} // 💡 키보드 접근성 향상
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
