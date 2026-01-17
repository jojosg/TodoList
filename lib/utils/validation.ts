export const validateImageFile = (file: File): string | null => {
  // 파일 이름 영어 검증 (확장자 제외)
  const fileName = file.name.split('.').slice(0, -1).join('.');
  const englishOnlyRegex = /^[a-zA-Z0-9_-]+$/;

  if (!englishOnlyRegex.test(fileName)) {
    return '파일 이름은 영어로만 이루어져야 합니다.';
  }

  // 파일 크기 검증 (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return '파일 크기는 5MB 이하여야 합니다.';
  }

  return null; // 검증 통과
};
