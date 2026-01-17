import { Item } from '@/types/todo';
import { apiClient } from './client';
import { UpdateItemDto } from '@/types/api';

// 할일 생성
export const createItem = async (name: string): Promise<Item> => {
  return apiClient<Item>('/items', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
};

// 할일 목록 조회
export const getItems = async (): Promise<Item[]> => {
  return apiClient<Item[]>('/items');
};

// 할일 상세 조회
export const getItem = async (itemId: number): Promise<Item> => {
  return apiClient<Item>(`/items/${itemId}`);
};

// 할일 수정
export const updateItem = async (itemId: number, data: UpdateItemDto): Promise<Item> => {
  return apiClient<Item>(`/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 할일 삭제
export const deleteItem = async (itemId: number): Promise<void> => {
  return apiClient<void>(`/items/${itemId}`, {
    method: 'DELETE',
  });
};
