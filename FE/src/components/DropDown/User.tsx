/* eslint-disable @next/next/no-img-element */
import useLocalStorage from '@/hooks/useLocalStorage';
import axiosClient from '@/libs/axiosClient';
import { UserProp } from '@/types/UserProp';
import Link from 'next/link';
import { useState } from 'react';
import { FaBell, FaBookmark, FaCoins, FaUpload, FaUser } from 'react-icons/fa';
import { FaArrowsUpDownLeftRight, FaClockRotateLeft } from 'react-icons/fa6';
import { deleteAuthToken } from '@/hooks/useAuth';
function Dropdown() {
  const [user, setUser] = useLocalStorage<UserProp | null>('user', null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await axiosClient.post("/api/auth/logout")
    .then(() => {
        setUser(null);
        deleteAuthToken();
        window.location.reload();
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropdown} 
            className="flex items-center justify-center w-12 h-12 font-normal text-mediumGray text-center select-none leading-[1.5] rounded-lg transition-all" 
            type="button" 
            aria-label="Notification">
                {user ? <img src={user.avatar} alt={user.name} className='rounded-full w-10 h-10' title={user.name} /> : <FaUser size={23} />}
        </button>
      </div>
      <div
        className={`origin-top-right absolute overflow-hidden min-w-[10rem] py-2 right-0 rounded-lg text-[1rem] text-[#8f96a0] shadow-lg bg-btn border border-btnHover transition-transform transform duration-300 ${
            isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <Link href={`/user/trang-ca-nhan`} className='bg-opacity11x whitespace-nowrap overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300'>
            <FaUser className='text-[0.9rem] w-[1.6rem]' />
            Trang cá nhân
        </Link>
        <Link href={`/user/lich-su-doc`} className='whitespace-nowrap overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300'>
            <FaClockRotateLeft className='text-[0.9rem] w-[1.6rem]' />
            Lịch sử đọc
        </Link>
        <Link href={`/user/truyen-theo-doi`} className='bg-opacity11x whitespace-nowrap overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300'>
            <FaBookmark className='text-[0.9rem] w-[1.6rem]' />
            Truyện theo dõi
        </Link>
        <Link href={`/user/thong-bao`} className='whitespace-nowrap overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300'>
            <FaBell className='text-[0.9rem] w-[1.6rem]' />
            Thông báo
        </Link>
        <Link href={`/user/mua-chap`} className='bg-opacity11x whitespace-nowrap overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300'>
            <FaCoins className='text-[0.9rem] w-[1.6rem]' />
            Lịch sử giao dịch
        </Link>
        <button onClick={handleLogout} className='w-full whitespace-nowrap overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300'>
            <FaArrowsUpDownLeftRight className='text-[0.9rem] w-[1.6rem]' />
            Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
