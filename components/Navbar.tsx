import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { FaUserCircle } from "react-icons/fa";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {
  const { pathname } = useRouter()
  return (
    <div className='flex justify-center w-full bg-white items-center h-20 shadow-md'>
      <nav className='max-w-[1280px] flex justify-between w-full px-2'>
        <div className='flex items-center gap-[50px]'>
          <h1 className='text-4xl text-cyan-700 font-lato'>CMGarments</h1>
          <ul className='flex items-center gap-7'>
            <li><Link className={`nav-link ${pathname === '/' ? 'active-link' : ''}`} href={'/'}>Home</Link></li>
            <li><Link className={`nav-link ${pathname === '/login' ? 'active-link' : ''}`} href={'/login'}>Login</Link></li>
            <li><Link className={`nav-link ${pathname === '/register' ? 'active-link' : ''}`} href={'/register'}>Register</Link></li>
          </ul>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-[18px] text-slate-800 capitalize'>username</span>
          <FaUserCircle size={30} className='text-cyan-600' />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;