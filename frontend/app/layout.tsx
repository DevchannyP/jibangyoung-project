// app/layout.tsx
import type { Metadata } from "next";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import "../styles/globals.css";
import Providers from "./providers"; // ✅ 추가

export const metadata: Metadata = {
  title: "지방청년 플랫폼",
  description: "정책 추천과 커뮤니티를 지원하는 지역 정착 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <main className="container" style={{ padding: "2rem 0" }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
