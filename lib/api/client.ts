import { BASE_URL, TENANT_ID } from '@/constants/tenant';

// API 요청 실패 시 사용할 커스텀 에러 클래스
// 기본 Error에 HTTP 상태 코드(status)를 추가한 형태
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 공통 API 클라이언트 함수
export const apiClient = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${BASE_URL}/${TENANT_ID}${endpoint}`;

  //서버에 HTTP 요청
  const response = await fetch(url, {
    ...options,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`);
  }

  return response.json();
};
