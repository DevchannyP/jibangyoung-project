"use client";

import Image from "next/image";

// [실무] 마스코트 일러스트 – 로그인/온보딩 LCP 핵심
export default function AuthMascots() {
  return (
    <div
      className="
        w-full
        flex
        justify-center
        items-end
        mb-2
        sm:mb-4
        max-w-[360px]
        mx-auto
      "
      aria-hidden="true" // 장식용, 폼엔 직접 연결 X
      style={{ minHeight: "120px" }} // 모바일에서 세로 공간 확보
    >
      <Image
        src="/social/mascots/auth-mascots.webp"
        alt="지방청년 플랫폼 마스코트 4종 일러스트 (청년 캐릭터: 호랑이, 까만 고양이, 초록 고양이, 노란 고양이)"
        width={340}
        height={172}
        className="object-contain rounded-2xl shadow-md drop-shadow-lg"
        priority
        sizes="(max-width: 480px) 90vw, (max-width: 768px) 340px, 420px"
        // blur placeholder 사용 불가 (public 경로)
        draggable={false}
      />
    </div>
  );
}
