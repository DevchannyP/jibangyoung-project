// // 예시 - types/api/auth.ts
// export type LoginResponse = {
//   user: User;
//   accessToken: string;
//   refreshToken: string;
// };

// // api 함수
// export const loginWithEmail = async (id: string, pw: string): Promise<LoginResponse> => {
//   const res = await axios.post("/api/login", { id, pw });
//   return res.data; // 또는 res.data.data
// };
