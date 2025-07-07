"use client";

import AuthMascots from "@/components/auth/AuthMascots";
import LoginForm from "@/components/auth/LoginForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import Head from "next/head";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>로그인 | 지방청년 플랫폼</title>
        <meta
          name="description"
          content="지방청년 플랫폼 로그인 – 정책 추천과 커뮤니티를 한 번에!"
        />
        <meta property="og:title" content="로그인 | 지방청년 플랫폼" />
        <meta
          property="og:description"
          content="지방청년 플랫폼 로그인 – 정책 추천과 커뮤니티를 한 번에!"
        />
      </Head>
      <main className="min-h-screen bg-yellow-200 flex flex-col justify-between">
        {/* 상단 마스코트/라운드 배경 */}
        <section className="w-full flex flex-col items-center">
          <div className="w-full flex justify-center bg-yellow-300 rounded-b-[48px] pt-12 pb-4 shadow-sm relative">
            {/* 마스코트 일러스트 (최상단) */}
            <div className="w-[340px] h-[172px] flex items-center justify-center relative z-10">
              <AuthMascots />
            </div>
          </div>
        </section>

        {/* 로그인 카드 */}
        <section className="w-full flex flex-1 flex-col items-center justify-center px-2">
          <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl px-6 py-8 flex flex-col items-center relative -mt-12">
            {/* 로그인 폼 */}
            <LoginForm />

            {/* 아이디/비번 찾기 */}
            <div className="w-full flex justify-between text-xs text-gray-500 mt-2 mb-3">
              <Link href="/auth/find-id" className="hover:underline">
                아이디 찾기
              </Link>
              <Link href="/auth/find-password" className="hover:underline">
                비밀번호 찾기
              </Link>
            </div>

            {/* 소셜 구분선 */}
            <div className="flex items-center w-full mb-2">
              <span className="flex-1 h-px bg-gray-300" />
              <span className="px-3 text-gray-400 text-xs font-semibold select-none">
                or
              </span>
              <span className="flex-1 h-px bg-gray-300" />
            </div>

            {/* 소셜 로그인 */}
            <SocialLoginButtons />
          </div>

          {/* 회원가입 안내 */}
          <div className="text-xs text-gray-500 text-center mt-5">
            계정이 없으신가요?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              회원가입
            </Link>
          </div>
        </section>

        {/* 하단 저작권/정책 */}
        <footer className="w-full py-6 flex justify-center items-end text-[11px] text-gray-400 select-none">
          <span>
            저작권 &copy; 지방청년 플랫폼 |{" "}
            <Link href="/policy" className="underline hover:text-blue-500">
              개인정보처리방침
            </Link>
          </span>
        </footer>
      </main>
    </>
  );
}
