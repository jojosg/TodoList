'use client';

import { useEffect, useState } from 'react';
import Editor from './components/Editor';
import TodoList from './components/TodoList';
import { Item } from '@/types/todo';
import { createItem, getItems, updateItem } from '@/lib/api/items';

export default function Home() {
  const [todos, setTodos] = useState<Item[]>([]); // 할 일 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string>(''); // 에러 메시지

  // 서버에서 할 일 목록을 가져오는 함수
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const items = await getItems(); // API 호출: 할 일 목록 조회
      setTodos(items); // 받아온 데이터를 state에 저장
      setError('');
      // 에러 발생 시
    } catch (err) {
      setError('할 일 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 할 일 목록을 불러옴
  useEffect(() => {
    fetchTodos();
  }, []);

  // 새로운 할 일을 추가하는 함수
  const handleAddTodo = async (name: string) => {
    if (!name.trim()) return; // 빈 값 체크
    try {
      const newItem = await createItem(name); // API 호출: 할 일 생성
      setTodos([...todos, newItem]); // 기존 목록에 새 항목 추가
      setError('');
      // 에러 발생 시
    } catch (err) {
      setError('할 일 추가에 실패했습니다.');
    }
  };

  //  할 일의 완료 상태를 토글하는 함수
  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return; // 찾지 못한 경우 종료
    try {
      // API 호출: 완료 상태 토글
      const updatedItem = await updateItem(id, {
        isCompleted: !todo.isCompleted,
      });

      // 목록에서 해당 항목만 업데이트
      setTodos(todos.map((t) => (t.id === id ? updatedItem : t)));
      setError('');
      //에러 발생 시
    } catch (err) {
      setError('할 일 상태 변경에 실패했습니다.');
    }
  };

  //로딩 중
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-500 text-18-b'>로딩 중...</p>
      </div>
    );
  }

  // 메인 UI렌더링
  return (
    <div>
      {/* 에러메시지 표시 */}
      {error && (
        <div className='bg-red-50 border border-red-200 text-(--rose-500) px-4 py-3 rounded-lg mb-4'>{error}</div>
      )}
      <Editor onCreate={handleAddTodo} />
      <TodoList data={todos} onToggle={handleToggleTodo} />
    </div>
  );
}
