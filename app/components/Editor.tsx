'use client';

import SearchBar from './common/SearchBar';
import Button from './common/Button';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { EditorProps } from '@/types/todo';

const Editor = ({ onCreate }: EditorProps) => {
  // 입력 필드의 현재 값을 관리하는 state
  const [inputValue, setInputValue] = useState('');

  // 할일 추가 함수
  const onSubmit = () => {
    if (inputValue.trim()) {
      onCreate(inputValue.trim());
      setInputValue('');
    }
  };

  // 엔터키를 누르면 할일 추가
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='flex gap-2 mt-4 items-center '>
      <SearchBar content={inputValue} onChange={setInputValue} onKeyPress={handleKeyPress} />
      <Button onClick={onSubmit}>
        <Plus />
        <div className='hidden sm:block'>추가하기</div>
      </Button>
    </div>
  );
};

export default Editor;
