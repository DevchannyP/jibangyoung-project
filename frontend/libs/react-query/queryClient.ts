import { QueryClient } from "@tanstack/react-query";

// ✅ [실무] React Query 글로벌 클라이언트 옵션
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // [캐싱/UX] 데이터 자주 안 변하면 캐시 길게(UX↑, 트래픽↓)
      staleTime: 1000 * 60 * 5, // 5분간 "신선"(캐시만 사용, 네트워크 X)
      cacheTime: 1000 * 60 * 10, // 10분간 메모리 캐시 유지
      retry: 2, // 에러 시 2회 자동 재시도(실무 권장)
      refetchOnWindowFocus: false, // 브라우저 포커스시 재요청 X(UX 선택)
      refetchOnReconnect: true, // 네트워크 복구시 자동 재요청
      // suspense: true,                 // 필요시 Suspense/Lazy Query 적용 가능
      // onError: (error) => {},         // 글로벌 에러 핸들링(모니터링 등)
    },
    mutations: {
      retry: 0, // POST/PATCH/DELETE(변경)는 자동재시도 OFF
      // onError: (error) => {},         // 글로벌 에러 핸들링 가능
    },
  },
  // ✅ [실무] Devtools 활성화 (process.env에 따라 제어)
  // logger: process.env.NODE_ENV === "development"
  //   ? console
  //   : { error: () => {}, log: () => {}, warn: () => {} }, // 운영 배포시 로그 최소화
});

// 💡 실무 팁
// - staleTime↑면 UX 부드럽고, 서버 부하↓ (실시간 데이터는 0~30초로 조절)
// - cacheTime↑면 탭 전환시 데이터 그대로(재요청X), 메모리↑
// - refetchOnWindowFocus는 대시보드/통계 페이지에서 true 권장
// - onError/모니터링/토스트 등은 Providers.tsx에서 global 처리 추천
// - 서비스 특성(게시판, 알림, 대시보드 등)에 따라 staleTime 분리도 가능
