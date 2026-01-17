import { TodoItemProps } from './todo';

export interface CreateItemDto {
  name: string;
}

export interface UpdateItemDto {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

// Props 확장
export interface ExtendedTodoItemProps extends TodoItemProps {
  isDetailPage?: boolean; // 상세 페이지인지 여부
  onNameUpdate?: (newName: string) => void; // 이름 업데이트 콜백
}
