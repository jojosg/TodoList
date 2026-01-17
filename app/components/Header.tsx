import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div
      className='h-16 flex items-center  mx-auto
    px-4
    sm:px-6
    bg-white
    xl:px-90 border-b border-(--slate-200)'
    >
      <Link href='/'>
        <Image src='/Size=Small.png' alt='Logo' width={71} height={40} className='block md:hidden' />
      </Link>
      <Link href='/'>
        <Image src='/Size=Large.png' alt='Logo' width={151} height={40} className='hidden md:block' />
      </Link>
    </div>
  );
};

export default Header;
