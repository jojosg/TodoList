interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'delete' | 'circle' | 'editing';
  size?: 'default' | 'small';
}

const Button = ({ children, onClick, variant = 'primary', size = 'default', ...props }: ButtonProps) => {
  const baseStyles = 'flex items-center justify-center cursor-pointer';

  const variants = {
    primary:
      'bg-(--primary) text-16-b text-white border-2 border-[#0F172A] rounded-3xl h-13 px-6 shadow-[2px_4px_0_0_rgba(15,23,42,1)]',
    editing:
      'bg-(--slate-200) text-16-b text-(--slate-900) border-2 border-[#0F172A] rounded-3xl h-13 w-[160px] shadow-[2px_4px_0_0_rgba(15,23,42,1)]',
    success:
      'bg-(--lime-300) text-16-b text-(--slate-900) border-2 border-[#0F172A] rounded-3xl h-13 w-[160px] shadow-[2px_4px_0_0_rgba(15,23,42,1)]',
    delete:
      'bg-(--rose-500) text-16-b text-white border-2 border-red-900 rounded-3xl h-13 w-[160px] shadow-[2px_4px_0_0_rgba(15,23,42,1)]',
    circle:
      size === 'small'
        ? 'bg-[#E2E8F0] text-[#0F172A] rounded-full w-12 h-12'
        : 'bg-[#E2E8F0] text-[#0F172A] border-2 border-[#0F172A] rounded-full w-16 h-16',
  };

  return (
    <button onClick={onClick} className={`flex items-center gap-1 ${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
