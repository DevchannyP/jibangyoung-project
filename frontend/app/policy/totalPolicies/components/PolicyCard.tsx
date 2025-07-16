// app/policy/totalPolicies/components/PolicyCard.tsx
"use client";

import { useState } from 'react';
import { Policy } from './PolicyCardList';
import styles from '../../total_policy.module.css';

interface PolicyCardProps extends Policy {
  onClick: () => void;
}

export default function PolicyCard({ 
  NO, 
  plcyNm, 
  bizPrdEtcCn,
  aplyYmd,
  ptcpPrpTrgtCn,
  mclsfNm,
  lclsfNm,
  sprtSclCnt,
  operInstNm,
  sprvsnInstNm,
  plcyExplnCn,
  plcySprtCn,
  sprtTrgtMinAge,
  sprtTrgtMaxAge,
  onClick 
}: PolicyCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // 백엔드 API 호출 로직 추가 필요
  };

  // 지원 규모 표시 함수
  const formatSupportScale = () => {
    if (sprtSclCnt) {
      return `${sprtSclCnt.toLocaleString()}원`;
    }
    return plcySprtCn || '지원 내용 확인';
  };

  // 연령대 표시 함수
  const formatAgeRange = () => {
    if (sprtTrgtMinAge && sprtTrgtMaxAge) {
      return `${sprtTrgtMinAge}세 ~ ${sprtTrgtMaxAge}세`;
    } else if (sprtTrgtMinAge) {
      return `${sprtTrgtMinAge}세 이상`;
    } else if (sprtTrgtMaxAge) {
      return `${sprtTrgtMaxAge}세 이하`;
    }
    return '연령 제한 없음';
  };

  // 카테고리 표시 (대분류/소분류)
  const getCategory = () => {
    if (mclsfNm && lclsfNm) {
      return `${mclsfNm} > ${lclsfNm}`;
    }
    return mclsfNm || lclsfNm || '분류 없음';
  };

  // 마감일 표시
  const formatDeadline = () => {
    if (aplyYmd) {
      const date = new Date(aplyYmd);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return { text: '마감', color: '#ef4444' };
      } else if (diffDays === 0) {
        return { text: '오늘 마감', color: '#f59e0b' };
      } else if (diffDays <= 7) {
        return { text: `${diffDays}일 남음`, color: '#f59e0b' };
      } else {
        return { text: date.toLocaleDateString('ko-KR'), color: '#6b7280' };
      }
    }
    return { text: '상시모집', color: '#6b7280' };
  };

  const deadlineInfo = formatDeadline();

  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.cardHeader}>
        <h3 className={styles.itemTitle}>{plcyNm}</h3>
        <button 
          className={styles.bookmarkButton}
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? "찜 취소" : "찜하기"}
        >
          <span className={`${styles.heartIcon} ${isBookmarked ? styles.bookmarked : ''}`}>
            {isBookmarked ? '❤️' : '🤍'}
          </span>
        </button>
      </div>
      
      {/* 정책 설명 또는 참여목적 표시 */}
      <p className={styles.itemSummary}>
        {plcyExplnCn || ptcpPrpTrgtCn || '정책 설명 준비중'}
      </p>
      
      <div className={styles.policyInfo}>
        <p className={styles.itemSupport}>💰 {formatSupportScale()}</p>
        <p className={styles.itemCategory}>📂 {getCategory()}</p>
        <p className={styles.itemAge}>👥 {formatAgeRange()}</p>
        <p 
          className={styles.itemDate}
          style={{ color: deadlineInfo.color }}
        >
          📅 {deadlineInfo.text}
        </p>
      </div>
      
      {/* 운영기관 표시 */}
      {operInstNm && (
        <div className={styles.institutionInfo}>
          <p className={styles.itemInstitution}>🏢 {operInstNm}</p>
        </div>
      )}
    </div>
  );
}