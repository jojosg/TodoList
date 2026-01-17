'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Pencil, Plus, X } from 'lucide-react';
import TodoItem from '@/app/components/TodoItem';
import Button from '@/app/components/common/Button';
import Image from 'next/image';
import { getItem, updateItem, deleteItem } from '@/lib/api/items';
import { uploadImage } from '@/lib/api/images';
import { validateImageFile } from '@/lib/utils/validation';
import { Item } from '@/types/todo';

interface Props {
  params: Promise<{ itemId: string }>;
}

const Page = ({ params }: Props) => {
  const router = useRouter();

  // State 정의
  const [itemId, setItemId] = useState<string>(''); // 할 일 ID
  const [todo, setTodo] = useState<Item | null>(null); // 할 일 데이터
  const [memo, setMemo] = useState<string>(''); // 메모 내용
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // 업로드된 이미지 URL
  const [imageFile, setImageFile] = useState<File | null>(null); // 선택한 이미지 파일
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string>(''); // 에러 메시지
  const [imageError, setImageError] = useState<string>(''); // 이미지 에러 메시지
  const [isSuccess, setIsSuccess] = useState(false); // 수정완료 버튼 상태관리
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 이미지 업로드 버튼을 input에 연결

  /**
   * params에서 itemId를 추출하는 useEffect
   */
  useEffect(() => {
    params.then((p) => setItemId(p.itemId));
  }, [params]);

  /**
   * itemId가 설정되면 할 일 데이터를 가져오는 useEffect
   */
  useEffect(() => {
    if (!itemId) return;

    const fetchTodo = async () => {
      try {
        setLoading(true);
        const item = await getItem(Number(itemId)); // API 호출: 할 일 상세 조회
        setTodo(item);
        setMemo(item.memo || ''); // 기존 메모 설정
        setUploadedImage(item.imageUrl || null); // 기존 이미지 설정
        setError('');
      } catch (err) {
        setError('할 일을 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [itemId]);

  /**
   * 이미지 파일 선택 시 처리하는 함수
   * - 파일 유효성 검사 (이름 영어만, 크기 5MB 이하)
   * - 미리보기 생성
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError('');

    // 파일 유효성 검사
    const validationError = validateImageFile(file);
    if (validationError) {
      setImageError(validationError);
      e.target.value = ''; // input 초기화
      return;
    }

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string); // 미리보기 URL 설정
      setImageFile(file); // 파일 객체 저장
    };
    reader.readAsDataURL(file);
  };

  // TodoItem에서 이름이 업데이트되었을 때 호출되는 콜백 함수
  const handleNameUpdate = (newName: string) => {
    if (todo) {
      setTodo({ ...todo, name: newName });
    }
  };

  // 할 일 수정 완료 처리 함수
  // - 이미지가 새로 선택된 경우 먼저 업로드
  // - 할 일 정보 업데이트 (메모, 이미지 URL)
  // - 완료 후 메인 페이지로 이동
  const handleUpdate = async () => {
    if (!todo) return;

    try {
      let imageUrl = uploadedImage;

      // 새로운 이미지 파일이 선택된 경우 업로드
      if (imageFile) {
        imageUrl = await uploadImage(imageFile); // API 호출: 이미지 업로드
      }
      setIsSuccess(true);

      // 할 일 정보 업데이트
      await updateItem(Number(itemId), {
        memo,
        imageUrl: imageUrl || undefined,
      });

      // 메인 페이지로 이동
      router.push('/');
    } catch (err) {
      setError('수정에 실패했습니다.');
    }
  };

  // 할 일 삭제 처리 함수
  // - 삭제 확인 후 API 호출
  // - 완료 후 메인 페이지로 이동
  const handleDelete = async () => {
    if (!todo) return;

    // 삭제 확인
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteItem(Number(itemId)); // API 호출: 할 일 삭제
      router.push('/'); // 메인 페이지로 이동
    } catch (err) {
      setError('삭제에 실패했습니다.');
      console.error(err);
    }
  };

  // 할 일 완료 상태 토글 함수
  const handleToggle = async () => {
    if (!todo) return;

    try {
      const updatedItem = await updateItem(Number(itemId), {
        isCompleted: !todo.isCompleted,
      });
      setTodo(updatedItem); // 상태 업데이트
    } catch (err) {
      setError('상태 변경에 실패했습니다.');
      console.error(err);
    }
  };

  // 버튼 클릭 시 input을 강제로 클릭
  const handleClickUploadButton = () => {
    fileInputRef.current?.click();
  };

  //  로딩 중일 때 표시할 UI
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-(--slate-600) text-18-b'>로딩 중...</p>
      </div>
    );
  }

  //  할 일을 찾지 못한 경우
  if (!todo) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-(--rose-500) text-18-b'>존재하지 않는 할 일입니다.</p>
      </div>
    );
  }

  return (
    <div className='bg-white min-h-svh pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 xl:mx-0 xl:px-24'>
      <TodoItem todo={todo} onToggle={handleToggle} isDetailPage={true} onNameUpdate={handleNameUpdate} />

      {/* 에러 메시지 표시 */}
      {error && (
        <div className='bg-red-50 border border-red-200 text-(--rose-500) px-4 py-3 rounded-lg mb-4'>{error}</div>
      )}

      <div className='flex flex-col gap-4 xl:flex-row xl:gap-4'>
        {/* 이미지 업로드 영역 */}
        <div className='xl:w-1/2'>
          {uploadedImage ? (
            // 이미지가 업로드된 경우 미리보기 표시
            <div className='relative h-64 rounded-2xl overflow-hidden border-2 border-(--slate-300)'>
              <Image src={uploadedImage} alt='uploaded image' fill className='object-cover' />
              <div className='absolute bottom-4 right-4'>
                <Button variant='circle' size='small' onClick={handleClickUploadButton}>
                  <Pencil />
                </Button>
              </div>
            </div>
          ) : (
            // 이미지가 없는 경우 업로드 UI
            <label
              htmlFor='image-upload'
              className='
                relative flex items-center justify-center
                h-64
                border-2 border-dashed border-(--slate-300)
                rounded-2xl
                cursor-pointer
                bg-(--slate-100)
                hover:bg-(--slate-100)
                transition-colors
              '
            >
              <div className='flex flex-col items-center'>
                <Image src='/img.png' alt='img_icon' width={64} height={64} />
                <div className='absolute bottom-4 right-4'>
                  <Button variant='circle' size='small' onClick={handleClickUploadButton}>
                    <Plus />
                  </Button>
                </div>
              </div>
            </label>
          )}

          <input
            id='image-upload'
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          {/* 이미지 에러 메시지 */}
          {imageError && <p className='text-(--rose-500) text-sm mt-2'>{imageError}</p>}
        </div>

        {/* 메모 영역 */}
        <div className='w-full xl:w-1/2 h-64 relative rounded-2xl overflow-hidden'>
          <Image src='/memo.png' alt='memo background' fill />
          <div className='text-(--amber-800) text-16-b absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-6 pb-4'>
            Memo
          </div>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder='메모를 입력하세요...'
            className='absolute top-18 left-0 right-0 bottom-0 px-6 pb-6 bg-transparent resize-none outline-none text-(--slate-800) placeholder:text-(--slate-500) text-center'
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className='flex justify-center gap-2 mt-6 lg:justify-end'>
        <Button variant={isSuccess ? 'success' : 'editing'} onClick={handleUpdate}>
          <Check className='w-5 h-5' />
          수정완료
        </Button>
        <Button variant='delete' onClick={handleDelete}>
          <X className='w-5 h-5' />
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default Page;
