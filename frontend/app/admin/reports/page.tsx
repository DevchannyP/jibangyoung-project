"use client";

import { useState } from "react";
import styles from "../AdminPage.module.css";
import { RegionTabs } from "../components/AdminRegionTab";
import { SearchBar } from "../components/AdminSearch";
import AdminSidebar from "../components/AdminSidebar";
import { AdminReportList } from "./components/AdminReportList";
import { AdminReportTab } from "./components/AdminReportTab";

export interface Report {
  no: number;
  title: string;
  reporter: string;
  date: string;
  count: number;
  status: "blind" | "processing" | "reject";
  region: string;
  url: string;
  reason: string;
  type: "게시글" | "댓글";
}

const initialReports: Report[] = [
  {
    no: 1,
    title: "서울은 너무 사람이 많아 살기 싫어요.",
    reporter: "홍길동",
    date: "2025-07-04",
    count: 15,
    status: "blind",
    region: "서울",
    url: "https://example.com/post/1",
    reason: "욕설 및 비방 글로 신고되었습니다.",
    type: "게시글",
  },
  {
    no: 2,
    title: "경기도 교통 너무 막혀요.",
    reporter: "김철수",
    date: "2025-07-05",
    count: 8,
    status: "processing",
    region: "경기도",
    url: "https://example.com/post/2",
    reason: "허위 사실 유포로 신고되었습니다.",
    type: "댓글",
  },
  {
    no: 3,
    title: "충청북도는 조용해서 좋아요.",
    reporter: "이영희",
    date: "2025-07-06",
    count: 3,
    status: "reject",
    region: "충청북도",
    url: "https://example.com/post/3",
    reason: "단순 의견 표현으로 기각되었습니다.",
    type: "게시글",
  },
];

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchResult, setSearchResult] = useState<Report[]>(initialReports);
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 전체/게시글/댓글 필터
  const filterData = (region: string, keyword: string, type: string) => {
    let filtered = reports;

    if (region !== "전체") {
      filtered = filtered.filter((r) => r.region === region);
    }

    if (keyword.trim() !== "") {
      filtered = filtered.filter(
        (r) => r.title.toLowerCase().includes(keyword.toLowerCase()) // ✅ 제목 검색만
      );
    }

    if (type !== "전체") {
      filtered = filtered.filter((r) => r.type === type);

      if (type === "게시글") {
        filtered = [...filtered].sort((a, b) => a.no - b.no);
      }
    }

    setSearchResult(filtered);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    filterData(region, searchKeyword, selectedType);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    filterData(selectedRegion, searchKeyword, type);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    filterData(selectedRegion, keyword, selectedType);
  };

  return (
    <div className={styles.adminContent}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>신고 목록</h1>

        <RegionTabs
          selectedRegion={selectedRegion}
          onSelectRegion={handleRegionChange}
        />

        <AdminReportTab
          selectedType={selectedType}
          onSelectType={handleTypeChange}
        />

        <SearchBar placeholder="제목 검색" onSearch={handleSearch} />

        <AdminReportList
          reports={searchResult}
          setReports={setReports}
          setSearchResult={setSearchResult}
          fullData={reports}
        />
      </div>
    </div>
  );
}
