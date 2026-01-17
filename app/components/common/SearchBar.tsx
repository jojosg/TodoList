interface SearchBarProps {
  content: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ content, onChange, onKeyPress }: SearchBarProps) => {
  return (
    <div
      className='
          h-14 flex-1
          rounded-full
          border-2 border-(--slate-900)
          bg-(--slate-100)
          flex items-center
          shadow-[1px_4px_0_0_rgba(0,0,0,1)]
          px-4
        '
    >
      <input
        type='text'
        value={content}
        placeholder='할 일을 입력해주세요'
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyPress}
        className='
            w-full
            bg-transparent
            outline-none
            text-(--slate-900)
            placeholder:text-(--slate-500)
          '
      />
    </div>
  );
};

export default SearchBar;
