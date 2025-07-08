/**
 * @type {import('next').NextConfig}
 * - TypeScript 기반 자동 완성 및 타입 검사 지원을 위한 JSDoc 주석입니다.
 * - Next.js 15 기준으로 deprecated된 항목 제거 및 호환성 유지
 */
const nextConfig = {
  // ✅ React 개발 모드에서 엄격한 검사 활성화 (렌더링 두 번 수행 등 부작용 탐지)
  reactStrictMode: true,

  // ⚡ 최신 Next.js 15에서는 swcMinify, appDir 등이 자동 내장되어 제거
  // swcMinify: true, ❌ 제거
  // experimental: { appDir: true }, ❌ 제거

  // 🖼️ 외부 이미지 도메인 허용 설정 (next/image 최적화용)
  images: {
    domains: ["example.com"], // 필요 시 추가
  },

  // 🔧 Webpack 설정 확장 가능
  webpack(config, options) {
    return config;
  }
};

// 📤 Next.js가 설정을 읽을 수 있도록 외부로 내보냄
module.exports = nextConfig;
