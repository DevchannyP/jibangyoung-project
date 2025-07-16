import { Policy } from '@/libs/types/policy';

interface PolicyResponse {
  no: number;
  plcyNm: string;
  plcyExplnCn: string;
  plcySprtCn: string;
  startDate: string;
  endDate: string;
  mclsfNm: string;
}

export async function fetchTestPolicies(): Promise<Policy[]> {
  const response = await fetch('http://localhost:8080/api/test/policies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch test policies');
  }

  const data: PolicyResponse[] = await response.json();

  return data.map(item => ({
    id: item.no,
    title: item.plcyNm,
    summary: item.plcyExplnCn || '내용 없음',
    support: item.plcySprtCn || '지원 정보 없음',
    startDate: item.startDate || '미정',
    endDate: item.endDate || '미정',
    category: item.mclsfNm || '미분류',
  }));
}