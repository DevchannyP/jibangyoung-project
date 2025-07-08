"use client";

import { loginWithEmail } from "@/libs/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function LoginForm() {
  const { setUser } = useAuthStore();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ 최초 렌더링 시 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ✅ React Query v5 로그인 뮤테이션
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

  // ✅ 유효성 검사
  const isIdValid = userid.trim().length >= 4;
  const isPwValid = password.length >= 4;
  const isFormValid = isIdValid && isPwValid;
  const isPending = loginMutation.status === "pending";

  const handleLogin = () => {
    if (!isPending && isFormValid) {
      setError(""); // 이전 에러 초기화
      loginMutation.mutate();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <form
      className="w-full max-w-xs mx-auto flex flex-col space-y-3"
      autoComplete="on"
      aria-label="로그인 입력 폼"
      onSubmit={handleSubmit}
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
        onKeyDown={handleKeyDown}
        className="border border-gray-200 rounded-xl px-4 py-3 mb-2 bg-gray-50 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />

      {/* 비밀번호 입력 */}
      <div className="relative">
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
          className="border border-gray-200 rounded-xl px-4 py-3 mb-2 w-full bg-gray-50 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPw((v) => !v)}
          className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-600 transition"
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
        >
          {showPw ? "숨김" : "보기"}
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="text-red-500 text-xs mt-1 min-h-[18px]" role="alert">
          {error}
        </div>
      )}

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isPending || !isFormValid}
        aria-disabled={isPending || !isFormValid}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl mt-1 transition disabled:opacity-60 text-base"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
