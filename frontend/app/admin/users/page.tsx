"use client";

import { useState } from "react";
import styles from "../AdminPage.module.css";
import { SearchBar } from "../components/AdminSearch";
import AdminSidebar from "../components/AdminSidebar";
import { AdminUserList } from "./components/AdminUserList";

const initialUsers = [
  {
    no: 1,
    name: "김철수",
    id: "KIM01",
    pw: "abcd",
    email: "kim01@example.com",
    phone: "010-2222-3333",
    birth: "1995-06-15",
    role: "멘토",
  },
  {
    no: 2,
    name: "오도리",
    id: "LEE02",
    pw: "efgh",
    email: "lee02@example.com",
    phone: "010-4444-5555",
    birth: "1993-04-22",
    role: "운영자",
  },
  {
    no: 3,
    name: "박영수",
    id: "PARK03",
    pw: "ijkl",
    email: "park03@example.com",
    phone: "010-5555-6666",
    birth: "1990-11-30",
    role: "일반 사용자",
  },
  {
    no: 4,
    name: "이민호",
    id: "LEE04",
    pw: "mnop",
    email: "lee04@example.com",
    phone: "010-7777-8888",
    birth: "1992-08-21",
    role: "멘토",
  },
  {
    no: 5,
    name: "최지우",
    id: "CHOI05",
    pw: "qrst",
    email: "choi05@example.com",
    phone: "010-9999-0000",
    birth: "1991-12-12",
    role: "운영자",
  },
  {
    no: 6,
    name: "한예슬",
    id: "HAN06",
    pw: "uvwx",
    email: "han06@example.com",
    phone: "010-1234-5678",
    birth: "1994-03-03",
    role: "일반 사용자",
  },
  {
    no: 7,
    name: "정우성",
    id: "JUNG07",
    pw: "yzab",
    email: "jung07@example.com",
    phone: "010-2345-6789",
    birth: "1989-09-09",
    role: "운영자",
  },
  {
    no: 8,
    name: "고소영",
    id: "GO08",
    pw: "cdef",
    email: "go08@example.com",
    phone: "010-3456-7890",
    birth: "1996-04-14",
    role: "일반 사용자",
  },
  {
    no: 9,
    name: "이수근",
    id: "LEE09",
    pw: "ghij",
    email: "lee09@example.com",
    phone: "010-4567-8901",
    birth: "1993-10-10",
    role: "멘토",
  },
  {
    no: 10,
    name: "서장훈",
    id: "SEO10",
    pw: "klmn",
    email: "seo10@example.com",
    phone: "010-5678-9012",
    birth: "1992-05-05",
    role: "운영자",
  },
  {
    no: 11,
    name: "김연아",
    id: "KIM11",
    pw: "opqr",
    email: "kim11@example.com",
    phone: "010-6789-0123",
    birth: "1997-07-17",
    role: "일반 사용자",
  },
];

export default function UserPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchResult, setSearchResult] = useState(initialUsers);

  const handleSearch = (keyword: string) => {
    if (keyword.trim() === "") {
      setSearchResult(users);
      return;
    }

    const result = users.filter(
      (user) =>
        user.name === keyword ||
        user.id === keyword ||
        user.email === keyword ||
        user.phone === keyword
    );

    setSearchResult(result);
  };

  return (
    <div className={styles.adminContent}>
      <AdminSidebar />

      <div className={styles.mainContent}>
        <h1 className={styles.title}>사용자 관리</h1>

        <SearchBar
          placeholder="이름, ID, 이메일, 전화번호 검색"
          onSearch={handleSearch}
        />

        <AdminUserList
          users={searchResult}
          allUsers={users}
          setUsers={setUsers}
          setSearchResult={setSearchResult}
        />
      </div>
    </div>
  );
}
