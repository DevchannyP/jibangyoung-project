import { create } from "zustand";
import { persist } from "zustand/middleware";

// 1. 사용자 정보 타입(실무 확장형)
export interface User {
  id: number;
  email: string;
  nickname: string;
  // role?: string;
  // profileImage?: string;
}

// 2. 인증 상태 구조
export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

// 3. Zustand + persist (로컬스토리지 영속성)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        // [실무] 서버 로그아웃/토큰 제거 요청 필요시 여기에 추가
        // 예: fetch("/api/auth/logout", { method: "POST" })
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
        }
      },
    }),
    {
      name: "auth-store", // localStorage 키
      partialize: (state) => ({ user: state.user }), // 저장할 필드 제한
      // storage: createJSONStorage(() => sessionStorage), // 세션 기준시 주석 해제
    }
  )
);

/*
  [실무 패턴 예시]
  - const { user, setUser, logout } = useAuthStore();
  - setUser({ id: 1, email: "a@b.com", nickname: "찬희" });
  - logout();
*/
