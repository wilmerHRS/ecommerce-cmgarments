import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type FC } from 'react';
import { FaUserCircle } from "react-icons/fa";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {

  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const handleTogleOpenDropdown = () => setIsOpenDropdown(!isOpenDropdown)

  const { pathname } = useRouter()

  const { customer, authLogout } = useAuth()

  return (
    <div className='flex justify-center w-full bg-white items-center h-20 shadow-md z-30'>
      <nav className='max-w-[1280px] flex justify-between w-full px-2'>
        <div className='flex items-center gap-[50px]'>
          <h1 className='text-4xl text-cyan-700 font-lato'>CMGarments</h1>
          <ul className='flex items-center gap-7'>
            <li><Link className={`nav-link ${pathname === '/' ? 'active-link' : ''}`} href={'/'}>Home</Link></li>
            <li><Link className={`nav-link ${pathname === '/shoppingcard' ? 'active-link' : ''}`} href={'/shoppingcard'}>Carrito</Link></li>
          </ul>
        </div>
        {
          !customer ?
            <ul className='flex items-center gap-5'>
              <li><Link className={`nav-link ${pathname === '/login' ? 'active-link' : ''}`} href={'/login'}>Login</Link></li>
              <li><Link className={`nav-link ${pathname === '/register' ? 'active-link' : ''}`} href={'/register'}>Register</Link></li>
            </ul>
            :
            <div className='flex items-center gap-4 relative border border-cyan-300 p-2 rounded-md cursor-pointer' onClick={handleTogleOpenDropdown}>
              <span className='text-[18px] text-slate-800 capitalize'>{`${customer.names.split(' ')[0]} ${customer.first_lastname}`}</span>
              <FaUserCircle size={30} className='text-cyan-600' />
              {
                isOpenDropdown &&
                <div className='absolute top-[50px] right-1 w-full p-3 bg-gray-200 rounded-lg'>
                  <ul className='flex flex-col'>
                    <li className='text-end hover:text-cyan-700 hover:font-semibold cursor-default' onClick={authLogout}>Logout</li>
                  </ul>
                </div>
              }
            </div>
        }
      </nav>
    </div>
  );
}
export default Navbar;