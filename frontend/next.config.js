/**
 * @type {import('next').NextConfig}
 * - TypeScript 기반 자동 완성 및 타입 검사 지원을 위한 JSDoc 주석입니다.
 */
const nextConfig = {
  // ✅ React 개발 모드에서 엄격한 검사 활성화 (렌더링 두 번 수행 등 부작용 탐지)
  reactStrictMode: true,

  // ⚡ SWC(Speedy Web Compiler) 기반 코드 압축으로 빌드 성능 향상
  swcMinify: true,

  // 🖼️ 외부 이미지 도메인 허용 설정 (next/image 최적화용)
  images: {
    domains: ["example.com"], // 필요 시 여기에 추가 도메인 등록
  },

  // 🧪 실험적 기능 활성화
  experimental: {
    appDir: true, // App Router (Next.js 13+) 사용 시 필수
  },

  // 🔧 Webpack 설정 확장 가능 (추후 커스터마이징 용도)
  webpack(config, options) {
    return config;
  }
};

// 📤 Next.js가 설정을 읽을 수 있도록 외부로 내보냄
module.exports = nextConfig;
