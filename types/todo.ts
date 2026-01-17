export interface Item {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export type TodoListProps = {
  data: Item[]; // 전체 할 일 목록
  onToggle: (id: number) => void; // 할 일 완료 토글 함수
};

export type TodoItemProps = {
  todo: Item;
  onToggle: () => void;
};

export type EditorProps = {
  onCreate: (name: string) => void;
};
