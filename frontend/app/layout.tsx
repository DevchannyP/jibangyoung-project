import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Providers from "./providers";

// ✅ 글로벌 스타일/Tailwind (필수)
import "@/styles/globals.css";

// ✅ 구글폰트 최적화 (WebFont, FOUT 방지)
const notoSans = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap", // FOIT 방지 (swap 권장)
});

// ✅ [SEO] 실무형 메타데이터 – OG, Twitter, Favicon, Viewport 등 포함
export const metadata: Metadata = {
  title: "지방청년 플랫폼",
  description: "정책 추천과 커뮤니티를 지원하는 지역 정착 플랫폼",
  keywords: [
    "지방청년",
    "정책 추천",
    "지역 커뮤니티",
    "Next.js",
    "Spring Boot",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "지방청년 플랫폼",
    description: "정책 추천과 커뮤니티를 지원하는 지역 정착 플랫폼",
    url: "https://jibangyoung.com", // 실제 도메인
    type: "website",
    images: [
      {
        url: "/og-image.png", // public 폴더 내 1200x630 PNG 권장
        width: 1200,
        height: 630,
        alt: "지방청년 플랫폼 미리보기",
      },
    ],
    siteName: "지방청년 플랫폼",
  },
  twitter: {
    card: "summary_large_image",
    title: "지방청년 플랫폼",
    description: "정책 추천과 커뮤니티를 지원하는 지역 정착 플랫폼",
    images: ["/og-image.png"],
  },
  // 실제 운영시 language, alternates, canonical 등도 확장
};

// ✅ 실무형 루트 레이아웃 컴포넌트
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* ✅ 폰트/외부 CDN preconnect (성능 최적화) */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* ✅ 반응형/모바일 뷰포트 (모든 디바이스 대응) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ✅ 파비콘/OG/SEO는 metadata에서 자동 포함 (추가 메타 가능) */}
      </head>
      <body className={notoSans.className + " bg-gray-50"}>
        {/* ✅ 글로벌 Provider(React Query/Zustand/Auth 등) 확장 구조 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
