// app/policy/totalPolicies/components/PolicyFilterBar.tsx
"use client";

import { useState, useEffect } from "react";
import styles from '../../total_policy.module.css';

interface PolicyFilterBarProps {
  searchType: string;
  setSearchType: (type: string) => void;
  region: string;
  setRegion: (region: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minAge?: number;
  setMinAge: (age: number | undefined) => void;
  maxAge?: number;
  setMaxAge: (age: number | undefined) => void;
}

export default function PolicyFilterBar({
  searchType,
  setSearchType,
  region,
  setRegion,
  sortBy,
  setSortBy,
  onSearch,
  searchQuery,
  onClearSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge
}: PolicyFilterBarProps) {
  const [tempQuery, setTempQuery] = useState('');
  const [tempMinAge, setTempMinAge] = useState<string>('');
  const [tempMaxAge, setTempMaxAge] = useState<string>('');

  useEffect(() => {
    setTempQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setTempMinAge(minAge ? minAge.toString() : '');
    setTempMaxAge(maxAge ? maxAge.toString() : '');
  }, [minAge, maxAge]);

  const handleSearchSubmit = () => {
    onSearch(tempQuery);
  };

  const handleClearClick = () => {
    setTempQuery('');
    setTempMinAge('');
    setTempMaxAge('');
    onClearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleMinAgeChange = (value: string) => {
    setTempMinAge(value);
    const age = value ? parseInt(value) : undefined;
    setMinAge(age);
  };

  const handleMaxAgeChange = (value: string) => {
    setTempMaxAge(value);
    const age = value ? parseInt(value) : undefined;
    setMaxAge(age);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label htmlFor="region">지역:</label>
          <select 
            id="region" 
            value={region} 
            onChange={(e) => setRegion(e.target.value)} 
            className={styles.select}
          >
            <option value="전국">전국</option>
            <option value="서울">서울</option>
            <option value="부산">부산</option>
            <option value="대구">대구</option>
            <option value="인천">인천</option>
            <option value="광주">광주</option>
            <option value="대전">대전</option>
            <option value="울산">울산</option>
            <option value="세종">세종</option>
            <option value="경기">경기</option>
            <option value="강원">강원</option>
            <option value="충북">충북</option>
            <option value="충남">충남</option>
            <option value="전북">전북</option>
            <option value="전남">전남</option>
            <option value="경북">경북</option>
            <option value="경남">경남</option>
            <option value="제주">제주</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="category">카테고리:</label>
          <select 
            id="category" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className={styles.select}
          >
            <option value="">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="sortBy">정렬:</label>
          <select 
            id="sortBy" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className={styles.select}
          >
            <option value="NO_desc">최신 등록순</option>
            <option value="aplyYmd_desc">신청마감일 임박순</option>
            <option value="aplyYmd_asc">신청마감일 여유순</option>
            <option value="sprtSclCnt_desc">지원금 높은순</option>
          </select>
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filterGroup}>
          <label htmlFor="searchType">검색 조건:</label>
          <select 
            id="searchType" 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)} 
            className={styles.select}
          >
            <option value="plcyNm">정책명</option>
            <option value="plcyExplnCn">정책설명</option>
            <option value="ptcpPrpTrgtCn">참여목적</option>
          </select>
        </div>
      </div>
      
      <div className={styles.searchRow}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            value={tempQuery}
            onChange={(e) => setTempQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어 입력"
            className={styles.searchInput}
          />
          <button 
            className={styles.searchButton} 
            onClick={handleSearchSubmit}
          >
            검색
          </button>
          {(searchQuery || selectedCategory || minAge || maxAge) && (
            <button 
              className={styles.clearButton} 
              onClick={handleClearClick}
            >
              전체 초기화
            </button>
          )}
        </div>
      </div>
    </div>
  );
}