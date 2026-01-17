import Link from 'next/link';
import { useState } from 'react';
import { updateItem } from '@/lib/api/items';
import { ExtendedTodoItemProps } from '@/types/api';

const TodoItem = ({ todo, onToggle, isDetailPage = false, onNameUpdate }: ExtendedTodoItemProps) => {
  // 이름 수정을 위한 state (상세 페이지에서만 사용)
  const [isEditingName, setIsEditingName] = useState(false);
  const [todoName, setTodoName] = useState(todo.name);

  // 더블클릭 핸들러
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isDetailPage) {
      e.preventDefault(); // Link 이동 방지
      setIsEditingName(true);
    }
  };

  // 이름 저장
  const handleSaveName = async () => {
    if (!todoName.trim()) {
      setTodoName(todo.name); // 빈 값이면 원래 이름으로 복구
      setIsEditingName(false);
      return;
    }

    try {
      await updateItem(todo.id, { name: todoName.trim() });
      if (onNameUpdate) {
        onNameUpdate(todoName.trim()); // 부모에게 변경 알림
      }
      setIsEditingName(false);
    } catch (err) {
      console.error('이름 수정 실패:', err);
      setTodoName(todo.name); // 실패 시 복구
      setIsEditingName(false);
    }
  };

  // 키보드 이벤트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setTodoName(todo.name);
      setIsEditingName(false);
    }
  };

  const content = (
    <div
      className={`
        flex gap-2 items-center my-4 border-2 rounded-full py-2 px-3
        ${todo.isCompleted ? 'bg-(--secondary)' : 'bg-white'}
      `}
    >
      <input
        type='checkbox'
        checked={todo.isCompleted}
        onChange={(e) => {
          e.preventDefault();
          onToggle();
        }}
        onClick={(e) => {
          e.preventDefault();
        }}
        className='w-8 h-8 border-2 border-(--slate-900) bg-yellow-50 appearance-none cursor-pointer 
          checked:bg-(--primary) checked:border-(--primary)
          checked:bg-[url("/checked.png")] 
          checked:bg-center checked:bg-no-repeat
          rounded-full'
      />

      {/* 상세 페이지에서 밑줄과 가운데 정렬 추가 */}
      {isDetailPage && isEditingName ? (
        // 수정 모드 (상세 페이지에서만)
        <input
          type='text'
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveName}
          autoFocus
          onClick={(e) => e.preventDefault()} // Link 이동 방지
          className={`
            flex-1 bg-transparent outline-none px-2 py-1 rounded text-center
            border-2 border-(--primary)
            ${todo.isCompleted ? 'line-through' : ''}
          `}
        />
      ) : (
        // 일반 텍스트
        <span
          onDoubleClick={handleDoubleClick}
          className={`
            flex-1
            ${todo.isCompleted ? 'line-through' : ''}
            ${isDetailPage ? 'underline text-center' : ''} 
          `}
        >
          {todo.name}
        </span>
      )}
    </div>
  );

  // 상세 페이지에서는 Link 없이 렌더링
  if (isDetailPage) {
    return content;
  }

  // 목록 페이지에서는 Link로 감싸서 렌더링
  return <Link href={`/items/${todo.id}`}>{content}</Link>;
};

export default TodoItem;
