import axiosClient from '@/libs/axiosClient';
import { difference } from '@/utils/date';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBell, FaBookmark, FaUpload, FaUser } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';

function DropdownNo() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      await axiosClient.get("/api/notifications/")
      .then((response) => {
        setNotifications(response.data.notifications);
        setTotalUnread(response.data.totalUnread);
      });
    };
    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllRead = async () => {
    await axiosClient.put("/api/notifications/read")
    .then(() => {
      setTotalUnread(0);
    });
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropdown} 
            className="flex items-center max-sm:hidden relative hover:text-white justify-center w-12 h-12 font-normal text-mediumGray text-center select-none leading-[1.5] rounded-lg transition-all" type="button" aria-label="Notification">
            <FaBell size={23} />
            {totalUnread !== 0 && <span className='absolute top-0 right-0 bg-[red] text-white text-[.65rem] px-1 rounded-full'>{totalUnread}</span>}
        </button>
      </div>
      <div
        className={`origin-top-right absolute overflow-hidden min-w-[10rem] w-[320px] py-2 right-0 rounded-lg text-[1rem] text-[#8f96a0] shadow-lg bg-btn border border-btnHover transition-transform transform duration-300 ${
            isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <div className='flex justify-between items-center p-4'>
            <p>Thông báo</p>
            <button onClick={handleMarkAllRead} className='text-[.85em] font-normal text-[#c6cacf] hover:text-white transition-all duration-300'>Đánh dấu tất cả đã đọc</button>
        </div>
        <div>
            {notifications.length === 0 && <div className='text-center p-4'>Không có thông báo nào.</div>}
            {notifications.length !== 0 && notifications.map((notification: any, index: number) => (
              notification.link ? <Link href={`${notification.link}`} key={index} className={`whitespace-nowrap ${notification.status === 'unread' ? 'bg-opacity11x' : ''} overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300`}>
                <div className='flex flex-col'>
                    <p className='text-[.85em]'>{notification.title}</p>
                    <p className='text-[.75em] text-[#c6cacf]'>{difference(notification.created_at)}</p>
                </div>
              </Link> : <span key={index} className={`whitespace-nowrap cursor-pointer ${notification.status === 'unread' ? 'bg-opacity11x' : ''} overflow-hidden text-ellipsis py-2 px-4 hover:text-white flex gap-1 items-center font-normal transition-all duration-300`}>
                <div className='flex flex-col'>
                    <p className='text-[.85em]'>{notification.title}</p>
                    <p className='text-[.75em] text-[#c6cacf]'>{difference(notification.created_at)}</p>
                </div>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DropdownNo;
