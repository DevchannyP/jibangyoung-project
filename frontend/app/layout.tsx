// ✅ app/layout.tsx

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Providers from "./providers";

const notoSans = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "지방청년 플랫폼",
  description: "정책 추천과 커뮤니티를 지원하는 지역 정착 플랫폼",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "지방청년 플랫폼",
    description: "정책 추천과 커뮤니티를 지원하는 지역 정착 플랫폼",
    url: "https://jibangyoung.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSans.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no, email=no, date=no, address=no" />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="container py-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
