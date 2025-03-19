/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import PaginateComic from "@/components/Client/Paginate";
import axiosClient from "@/libs/axiosClient";
import { difference } from "@/utils/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

function Page() {
    const [data, setData] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        // const fetchData = async () => {
        //     await axiosClient.get('/baseapi/users/getAllNotifications?page=' + currentPage)
        //         .then(res => {
        //             setData(res.data.notifications);
        //             setCurrentPage(res.data.notifications.current_page);
        //         })
        //         .catch(() => {
        //             router.push('/');
        //         });
        // }
        // fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleMarkAllAsRead = async () => {
        await axiosClient.get('/baseapi/users/markAllRead')
            .then(() => {
                window.location.reload();
            });
    }
    return (  
        <div className="mb-10">
            <div className="flex justify-between mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center">Thông báo</h2>
                <button onClick={handleMarkAllAsRead} className="py-1 px-2 text-[.875rem] leading-[1.5] flex gap-1 items-center justify-center rounded-md text-white bg-btn font-normal text-center transition-all duration-300 hover:bg-[#24344f]">
                    <FaCheck />
                    Đánh dấu tất cả đã đọc
                </button>
            </div>
            <div>
                {data && data.data && data.data.length > 0 && data.data.map((item: any, index: number) => ( 
                item.link ? <Link href={item.link} key={index} className={`${index % 2 === 0 ? 'bg-opacity11x' : ''} ${item.status === 'unread' ? '' : 'opacity-70 grayscale'} hover:bg-[#1e2c43] flex items-center relative p-4 w-full transition-all duration-300`}>
                    <div className="flex-grow w-full">
                        <h6 className="transition-all duration-300 w-full hover:text-white text-[1rem] font-semibold line-clamp-1 text-ellipsis leading-[1.5rem] text-[#c6cacf]">
                            {item.title}
                        </h6>
                        <span className="text-[#3c8bc6] text-[13px]">
                            {item.content}
                        </span>
                        <p className="text-[.95rem] text-[#747c88]">{difference(item.created_at)}</p>
                    </div>
                </Link>
                : <span key={index} className={`${index % 2 === 0 ? 'bg-opacity11x' : ''} ${item.status === 'unread' ? '' : 'opacity-70 grayscale'} hover:bg-[#1e2c43] flex items-center relative p-4 w-full transition-all duration-300`}>
                    <div className="flex-grow w-full">
                        <h6 className="transition-all duration-300 w-full hover:text-white text-[1rem] font-semibold line-clamp-1 text-ellipsis leading-[1.5rem] text-[#c6cacf]">
                            {item.title}
                        </h6>
                        <span className="text-[#3c8bc6] text-[13px]">
                            {item.content}
                        </span>
                        <p className="text-[.95rem] text-[#747c88]">{difference(item.created_at)}</p>
                    </div>
                </span>
                ))}
                {data && data.data.length !== 0 && <PaginateComic currentPage={currentPage} totalPage={data.last_page} onPageChangeCustom={handlePageChange} />}
            </div>
        </div>
    );
}

export default Page;