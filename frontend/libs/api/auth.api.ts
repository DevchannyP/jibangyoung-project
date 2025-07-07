// /libs/api/auth.api.ts

// 1. 서버 응답 타입 정의 (실무 DTO 기준 확장)
export interface LoginResponse {
  user: {
    id: number;
    username: string;
    email: string;
    nickname?: string;
    // ...추가 필드
  };
  [key: string]: any; // 정책/세션 등 확장
}

export interface ApiError {
  code?: string;
  message: string;
}

// 2. fetch + 공통 에러 핸들러로 분리 (유지보수성↑)
async function safeFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  try {
    return await fetch(input, init);
  } catch (e: any) {
    // 네트워크 장애, 서버 다운, CORS, 타임아웃 등
    throw new Error("네트워크 연결 실패 (서버 미응답)");
  }
}

// 3. 이메일 로그인 API – 상세 예외 분기 + 타입 안전성
export async function loginWithEmail(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await safeFetch("/api/auth/email-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include", // HttpOnly 쿠키(백엔드에서 secure/sameSite 처리)
  });

  if (!response.ok) {
    let apiError: ApiError = { message: "로그인 실패" };
    try {
      apiError = await response.json();
    } catch {
      // JSON 파싱 불가(서버 장애, CORS, 502 등)
    }
    // 상황별 UX 안내(코드별)
    switch (apiError.code) {
      case "USER_NOT_FOUND":
        throw new Error("존재하지 않는 계정입니다.");
      case "INVALID_PASSWORD":
        throw new Error("비밀번호가 올바르지 않습니다.");
      case "ACCOUNT_LOCKED":
        throw new Error("계정이 잠겨있습니다. 관리자에게 문의하세요.");
      default:
        throw new Error(apiError.message || "로그인 실패");
    }
  }

  // 정상 응답 – 타입 검사/추가 검증
  const data = await response.json();
  if (!data.user || !data.user.id) {
    throw new Error("유저 정보가 올바르지 않습니다.");
  }
  // (선택) 추가 유효성 검사/정규화
  return data;
}
