// app/policy/totalPolicies/components/PolicyCardList.tsx
"use client";

import PolicyCard from './PolicyCard';
import styles from '../../total_policy.module.css';

// 데이터베이스 테이블 구조에 맞는 인터페이스
export interface Policy {
  NO: number;           // 기본키
  plcyNm: string;       // 정책명
  bizPrdEtcCn?: string; // 사업기간기타내용 (옵션)
  aplyYmd?: string;     // 적용일자 (옵션)
  ptcpPrpTrgtCn?: string; // 참여목적대상내용 (옵션)
  refUrlAddr1?: string; // 참조URL주소1 (옵션)
  mclsfNm?: string;     // 대분류명 (옵션)
  lclsfNm?: string;     // 소분류명 (옵션)
  sprtSclCnt?: number;  // 지원규모수 (옵션)
  operInstNm?: string;  // 운영기관명 (옵션)
  sprvsnInstNm?: string; // 주관기관명 (옵션)
  plcyExplnCn?: string; // 정책설명내용 (옵션)
  plcySprtCn?: string;  // 정책지원내용 (옵션)
  sprtTrgtMinAge?: number; // 지원대상최소연령 (옵션)
  sprtTrgtMaxAge?: number; // 지원대상최대연령 (옵션)
}

interface PolicyCardListProps {
  policies: Policy[];
  onCardClick: (id: number) => void;
}

export default function PolicyCardList({ policies, onCardClick }: PolicyCardListProps) {
  if (!policies || policies.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>표시할 정책이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {policies.map((policy) => (
        <PolicyCard 
          key={policy.NO} 
          {...policy} 
          onClick={() => onCardClick(policy.NO)} 
        />
      ))}
    </div>
  );
}