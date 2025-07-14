// app/auth/find-password/page.tsx
export default function FindPasswordPage() {
  return (
    <form>
      <h2>비밀번호 재설정</h2>
      <input type="email" placeholder="가입 이메일" required />
      <button type="submit">재설정 링크 보내기</button>
    </form>
  );
}
