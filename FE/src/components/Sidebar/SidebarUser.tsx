"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBell, FaBookmark, FaCartArrowDown, FaCoins, FaComment, FaLevelUpAlt, FaUpload, FaUser } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";

function SidebarUser() {
    const pathname = usePathname();
    return ( 
        <aside className="w-full lg:w-[20rem] max-lg:mb-4 flex-shrink-0 flex flex-col select-none">
            <ul className="rounded-lg overflow-hidden max-lg:flex max-lg:border-borderuser text-mediumGray">
                <li className="max-lg:flex-grow bg-bguser">
                    <Link href="/user/trang-ca-nhan" className={`py-[.7rem] ${pathname === '/user/trang-ca-nhan' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaUser className="w-[1.7rem]" />
                        <span className="max-md:hidden">Trang cá nhân</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow">
                    <Link href="/user/lich-su-doc" className={`py-[.7rem] ${pathname === '/user/lich-su-doc' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaClockRotateLeft className="w-[1.7rem]" />
                        <span className="max-md:hidden">Lịch sử đọc</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow bg-bguser">
                    <Link href="/user/truyen-theo-doi" className={`py-[.7rem] ${pathname === '/user/truyen-theo-doi' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaBookmark className="w-[1.7rem]" />
                        <span className="max-md:hidden">Truyện theo dõi</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow">
                    <Link href="/user/thong-bao" className={`py-[.7rem] ${pathname === '/user/thong-bao' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaBell className="w-[1.7rem]" />
                        <span className="max-md:hidden">Thông báo</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow bg-bguser">
                    <Link href="/user/nap-diem" className={`py-[.7rem] ${pathname === '/user/nap-diem' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaCoins className="w-[1.7rem]" />
                        <span className="max-md:hidden">Nạp tiền</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow">
                    <Link href="/user/binh-luan" className={`py-[.7rem] ${pathname === '/user/binh-luan' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaComment className="w-[1.7rem]" />
                        <span className="max-md:hidden">Bình luận</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow bg-bguser">
                    <Link href="/user/mua-chap" className={`py-[.7rem] ${pathname === '/user/mua-chap' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaCartArrowDown className="w-[1.7rem]" />
                        <span className="max-md:hidden">Lịch sử giao dịch</span>
                    </Link>
                </li>
                <li className="max-lg:flex-grow">
                    <Link href="/user/cap-bac" className={`py-[.7rem] ${pathname === '/user/cap-bac' ? 'text-white bg-btnHover' : ''} px-0 hover:bg-btn hover:text-white lg:px-8 flex max-lg:justify-center text-[1.1rem] items-center tracking-[.05rem] transition-all duration-300`}>
                        <FaLevelUpAlt className="w-[1.7rem]" />
                        <span className="max-md:hidden">Cấp bậc</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default SidebarUser;