import { BASE_URL, TENANT_ID } from '@/constants/tenant';

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${BASE_URL}/${TENANT_ID}/images/upload`, {
    method: 'POST',
    body: formData, // FormData는 Content-Type 자동 설정됨
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  const data = await response.json();
  return data.url; // 서버에서 반환하는 이미지 URL
};
