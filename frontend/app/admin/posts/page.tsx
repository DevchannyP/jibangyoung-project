// app/admin/posts/page.tsx
"use client";

import styles from "../AdminPage.module.css";
import AdminSidebar from "../components/AdminSidebar";

export default function PostsPage() {
  return (
    <div className={styles.adminContent}>
      <AdminSidebar />
      <h1>게시글 관리 리스트</h1>
      <p>내용</p>
    </div>
  );
}
