"use client";

import { useState } from "react";
import styles from "../AdminPage.module.css";
import { RegionTabs } from "../components/AdminRegionTab";
import { SearchBar } from "../components/AdminSearch";
import AdminSidebar from "../components/AdminSidebar";
import { MentorApplyList } from "./components/MentorsApplyList";

// 더미 데이터
const initialMentorApplications = [
  {
    no: 1,
    name: "홍길동",
    email: "hong1@naver.com",
    reason: "서울에서 멘토를 하고 싶습니다.",
    region: "서울",
    date: "2025-07-06",
    status: "대기중",
    fileUrl: "/files/sample1.pdf",
  },
  {
    no: 2,
    name: "김철수",
    email: "kim2@naver.com",
    reason: "경기도에서 멘토를 하고 싶습니다.",
    region: "경기도",
    date: "2025-07-07",
    status: "대기중",
    fileUrl: "/files/sample2.pdf",
  },
  {
    no: 3,
    name: "이영희",
    email: "lee3@naver.com",
    reason: "충청북도에서 멘토를 하고 싶습니다.",
    region: "충청북도",
    date: "2025-07-08",
    status: "대기중",
    fileUrl: "/files/sample3.pdf",
  },
  {
    no: 4,
    name: "박민수",
    email: "park4@naver.com",
    reason: "충청남도에서 멘토를 하고 싶습니다.",
    region: "충청남도",
    date: "2025-07-09",
    status: "대기중",
    fileUrl: "/files/sample4.pdf",
  },
  {
    no: 5,
    name: "최지우",
    email: "choi5@naver.com",
    reason: "전라북도에서 멘토를 하고 싶습니다.",
    region: "전라북도",
    date: "2025-07-10",
    status: "대기중",
    fileUrl: "/files/sample5.pdf",
  },
  {
    no: 6,
    name: "한예슬",
    email: "han6@naver.com",
    reason: "전라남도에서 멘토를 하고 싶습니다.",
    region: "전라남도",
    date: "2025-07-11",
    status: "대기중",
    fileUrl: "/files/sample6.pdf",
  },
  {
    no: 7,
    name: "정우성",
    email: "jung7@naver.com",
    reason: "경상북도에서 멘토를 하고 싶습니다.",
    region: "경상북도",
    date: "2025-07-12",
    status: "대기중",
    fileUrl: "/files/sample7.pdf",
  },
  {
    no: 8,
    name: "고소영",
    email: "ko8@naver.com",
    reason: "경상남도에서 멘토를 하고 싶습니다.",
    region: "경상남도",
    date: "2025-07-13",
    status: "대기중",
    fileUrl: "/files/sample8.pdf",
  },
  {
    no: 9,
    name: "이민호",
    email: "lee9@naver.com",
    reason: "강원도에서 멘토를 하고 싶습니다.",
    region: "강원도",
    date: "2025-07-14",
    status: "대기중",
    fileUrl: "/files/sample9.pdf",
  },
  {
    no: 10,
    name: "장도윤",
    email: "jang10@naver.com",
    reason: "제주도에서 멘토를 하고 싶습니다.",
    region: "제주도",
    date: "2025-07-15",
    status: "대기중",
    fileUrl: "/files/sample10.pdf",
  },
  {
    no: 11,
    name: "오장군",
    email: "oh11@naver.com",
    reason: "전국 어디서든 멘토를 하고 싶습니다.",
    region: "전체",
    date: "2025-07-16",
    status: "대기중",
    fileUrl: "/files/sample11.pdf",
  },
];

export default function MentorApplyPage() {
  const [applications, setApplications] = useState(initialMentorApplications);
  const [searchResult, setSearchResult] = useState(initialMentorApplications);
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");

  const filterData = (region: string, keyword: string) => {
    let filtered = applications;

    if (region !== "전체") {
      filtered = filtered.filter((app) => app.region === region);
    }

    if (keyword.trim() !== "") {
      filtered = filtered.filter(
        (app) =>
          app.name.includes(keyword) ||
          app.email.includes(keyword) ||
          app.region.includes(keyword)
      );
    }

    setSearchResult(filtered);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    filterData(region, searchKeyword);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    filterData(selectedRegion, keyword);
  };

  return (
    <div className={styles.adminContent}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>멘토 신청 목록</h1>

        <RegionTabs
          selectedRegion={selectedRegion}
          onSelectRegion={handleRegionChange}
        />

        <SearchBar
          placeholder="이름, 이메일, 지역 검색"
          onSearch={handleSearch}
        />

        <MentorApplyList
          applications={searchResult}
          setApplications={setApplications}
          setSearchResult={setSearchResult}
        />
      </div>
    </div>
  );
}
