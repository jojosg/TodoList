import Image from 'next/image';
import TodoItem from './TodoItem';
import { Item, TodoListProps } from '@/types/todo';

const TodoList = ({ data, onToggle }: TodoListProps) => {
  // isDone 상태에따라 리스트 분리
  const todoList = data.filter((todo) => !todo.isCompleted);
  const doneList = data.filter((todo) => todo.isCompleted);
  return (
    <div className='flex flex-col xl:flex-row xl:gap-12 mt-6'>
      {/* TODO 영역 */}
      <div className='flex-1'>
        <Image src='/todo.png' alt='state' width={101} height={36} />
        {todoList.length === 0 ? (
          <div className='flex items-center justify-center flex-col'>
            {/* mobile */}
            <Image
              src='/Type=Todo, Size=Large.png'
              alt='empty_todo'
              width={120}
              height={120}
              className='block sm:hidden'
            />

            {/* tablet & desktop */}
            <Image
              src='/Type=Todo, Size=Large.png'
              alt='empty_todo'
              width={240}
              height={240}
              className='hidden sm:block'
            />
            <div className='text-center text-(--slate-400) leading-none mt-4'>
              <div>할 일이 없어요.</div>
              <div>TODO를 새롭게 추가해주세요!</div>
            </div>
          </div>
        ) : (
          <div className='mt-4'>
            {todoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={() => onToggle(todo.id)} />
            ))}
          </div>
        )}
      </div>

      {/* DONE 영역 */}
      <div className='flex-1 mt-12 lg:mt-0'>
        <Image src='/done.png' alt='state' width={101} height={36} />
        {doneList.length === 0 ? (
          <div className='flex items-center justify-center flex-col'>
            {/* mobile */}
            <Image
              src='/Type=Done, Size=Large.png'
              alt='empty_done'
              width={120}
              height={120}
              className='block sm:hidden'
            />

            {/* tablet & desktop */}
            <Image
              src='/Type=Done, Size=Large.png'
              alt='empty_done'
              width={240}
              height={240}
              className='hidden sm:block'
            />
            <div className='text-center text-(--slate-400) leading-none mt-4'>
              <div>아직 다 한 일이 없어요.</div>
              <div> 해야 할 일을 체크해보세요!</div>
            </div>
          </div>
        ) : (
          <div className='mt-4'>
            {doneList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={() => onToggle(todo.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
