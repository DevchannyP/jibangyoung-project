// app/auth/find-password/page.tsx
export default function FindIdPage() {
  return (
    <form>
      <h2>아이디찾기 재설정</h2>
      <input type="email" placeholder="가입 이메일" required />
      <button type="submit">재설정 링크 보내기</button>
    </form>
  );
}
