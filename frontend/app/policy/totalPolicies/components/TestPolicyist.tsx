"use client";

import { useState, useEffect } from 'react';
import { fetchTestPolicies } from '@/libs/api/policy.api';
import { Policy } from '@/libs/types/policy';
import styles from '../../total_policy.module.css';

export default function TestPolicyList() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestPolicies()
      .then(setPolicies)
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>오류: {error}</div>;

  return (
    <div className={styles.list}>
      <h2>테스트 정책 목록</h2>
      {policies.length === 0 ? (
        <p>데이터가 없습니다.</p>
      ) : (
        <ul>
          {policies.map(policy => (
            <li key={policy.id} className={styles.item}>
              <h3>{policy.title}</h3>
              <p>요약: {policy.summary}</p>
              <p>지원: {policy.support}</p>
              <p>카테고리: {policy.category}</p>
              <p>게시일: {policy.startDate}</p>
              <p>마감일: {policy.endDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}