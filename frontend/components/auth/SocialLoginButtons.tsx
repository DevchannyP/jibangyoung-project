"use client";

// /components/auth/SocialLoginButtons.tsx
import Image from "next/image";

// [실무] 소셜 버튼 리스트/확장성 구조
const SOCIALS = [
  {
    name: "카카오",
    color: "bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400",
    logo: "/social/kakao.webp",
    provider: "kakao",
    aria: "카카오로 로그인",
    border: "",
    shadow: "shadow-[0_2px_10px_#ffecb3]",
  },
  {
    name: "구글",
    color: "bg-white hover:bg-gray-100 focus:bg-gray-100",
    logo: "/social/google.webp",
    provider: "google",
    aria: "구글로 로그인",
    border: "border border-gray-300",
    shadow: "shadow",
  },
  {
    name: "네이버",
    color: "bg-green-500 hover:bg-green-600 focus:bg-green-600",
    logo: "/social/naver.webp",
    provider: "naver",
    aria: "네이버로 로그인",
    border: "",
    shadow: "shadow-[0_2px_8px_#a7f3d0]",
  },
];

export default function SocialLoginButtons() {
  // [실무] 엔터/스페이스키로도 인증 지원(a11y)
  const handleSocial = (provider: string) => {
    window.location.href = `/api/auth/${provider}`;
    // [실무] 팝업, state/csrf, 에러 등은 백엔드/프론트 연동 확장
  };

  return (
    <div className="flex justify-center gap-4 my-2">
      {SOCIALS.map((s, idx) => (
        <button
          key={s.provider}
          type="button"
          tabIndex={0}
          role="button"
          onClick={() => handleSocial(s.provider)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSocial(s.provider);
          }}
          aria-label={s.aria}
          className={`
            w-12 h-12 flex items-center justify-center rounded-full
            transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300
            ${s.color} ${s.border} ${s.shadow}
          `}
          style={{
            boxShadow: s.shadow ? undefined : undefined, // tailwind-shadow만 사용
          }}
        >
          <Image
            src={s.logo}
            alt={`${s.name} 소셜 로그인 버튼 로고`}
            width={28}
            height={28}
            priority={idx === 0}
            className="object-contain"
            draggable={false}
          />
        </button>
      ))}
    </div>
  );
}
