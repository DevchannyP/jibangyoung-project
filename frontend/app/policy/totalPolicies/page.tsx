"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import policyApi, { PolicyListResponse } from "@/libs/api/policy.api";
import PolicyCardList from './components/PolicyCardList';
import PolicyFilterBar from './components/PolicyFilterBar';
import Pagination from './components/Pagination';
import PolicyCounter from './components/PolicyCounter';
import styles from '../total_policy.module.css';

export default function PolicyPage() {
  const [policyData, setPolicyData] = useState<PolicyListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  
  // 검색 및 필터 상태 - 데이터베이스 컬럼에 맞게 수정
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('plcyNm'); // 정책명으로 기본 설정
  const [region, setRegion] = useState('전국');
  const [sortBy, setSortBy] = useState('NO_desc'); // 최신 등록순
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minAge, setMinAge] = useState<number | undefined>();
  const [maxAge, setMaxAge] = useState<number | undefined>();

  const itemsPerPage = 12;
  const router = useRouter();

  // 카테고리 목록 로드 (대분류 기준)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await policyApi.getMajorCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('카테고리 로드 실패:', error);
      }
    };
    loadCategories();
  }, []);

  // 정책 데이터 로드
  const loadPolicies = async () => {
    setIsLoading(true);
    try {
      const response = await policyApi.getPolicies({
        page: currentPage,
        size: itemsPerPage,
        searchType: searchType as 'plcyNm' | 'plcyExplnCn' | 'ptcpPrpTrgtCn',
        searchQuery: searchQuery || undefined,
        region,
        sortBy: sortBy as 'aplyYmd_desc' | 'aplyYmd_asc' | 'sprtSclCnt_desc' | 'NO_desc',
        category: selectedCategory || undefined,
        minAge,
        maxAge
      });
      setPolicyData(response);
    } catch (error) {
      console.error('정책 데이터 로드 실패:', error);
      setPolicyData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 조건이 변경될 때마다 데이터 로드
  useEffect(() => {
    loadPolicies();
  }, [currentPage, searchType, region, sortBy, searchQuery, selectedCategory, minAge, maxAge]);

  // 검색 조건 변경 시 첫 페이지로 이동
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchType, region, sortBy, searchQuery, selectedCategory, minAge, maxAge]);

  const handleCardClick = (id: number) => {
    router.push(`/policy_detail/${id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinAge(undefined);
    setMaxAge(undefined);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (policyData && currentPage < policyData.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.headerTitle}>정책 포털</h1>
      <div className={styles.content}>
        <PolicyCounter 
          total={policyData?.totalCount || 0} 
          filtered={policyData?.totalCount || 0} 
        />

        <PolicyFilterBar
          searchType={searchType}
          setSearchType={setSearchType}
          region={region}
          setRegion={setRegion}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onClearSearch={handleClearSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
        />

        {isLoading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : !policyData || policyData.policies.length === 0 ? (
          <div className={styles.noResults}>
            <h3>검색 결과가 없습니다.</h3>
            {searchQuery && <p>검색어: {searchQuery}</p>}
            {selectedCategory && <p>카테고리: {selectedCategory}</p>}
            {(minAge || maxAge) && (
              <p>연령: {minAge || 0}세 ~ {maxAge || 100}세</p>
            )}
            <button onClick={handleClearSearch} className={styles.clearButton}>
              전체 정책 보기
            </button>
          </div>
        ) : (
          <>
            <PolicyCardList 
              policies={policyData.policies} 
              onCardClick={handleCardClick} 
            />
            <Pagination
              currentPage={currentPage}
              totalPages={policyData.totalPages}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}