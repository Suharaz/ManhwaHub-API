/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import PaginateComic from "@/components/Client/Paginate";
import useToast from "@/hooks/useToast";
import axiosClient from "@/libs/axiosClient";
import { renderStatus } from "@/utils/status";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { ToastContainer, Zoom } from "react-toastify";
import { UserProp } from "@/types/UserProp";
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from "@/hooks/useLocalStorage";

function Page() {
    const [user, setUser] = useLocalStorage<UserProp | null>('user', null);
    const [data, setData] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9); // Giả sử mỗi trang hiển thị 9 items
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const {showToast} = useToast();
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            await axiosClient.get('/api/user/'+user?.id+'/history?page=' + currentPage)
                .then(res => {
                    if (res.data.success && res.data.data.readingHistory) {
                        setData(res.data.data.readingHistory);
                        setTotalItems(res.data.data.readingHistory.length);
                        
                        // Tính toán tổng số trang dựa trên số lượng items
                        const calculatedTotalPages = Math.ceil(res.data.data.readingHistory.length / itemsPerPage);
                        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
                    } else {
                        setData([]);
                        setTotalPages(1);
                    }
                })
                .catch(() => {
                    router.push('/');
                });
        }
        fetchData();
    }, [currentPage, reload]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleRemove = (id: number) => {
        axiosClient.post('/baseapi/users/removeHistory',{
            id,
            type: 'comic'
        }).then((res) => {
            setReload(!reload);
            showToast(res.data.message, {type: "success"});
        });
    }

    // Lấy chapter mới nhất từ list_chapter
    const getLatestChapter = (listChapter: string) => {
        try {
            const chapters = JSON.parse(listChapter);
            return chapters.length > 0 ? Math.max(...chapters) : null;
        } catch (e) {
            return null;
        }
    }

    return (  
        <div className="mb-10">
            <ToastContainer transition={Zoom} />
            <div className="mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center">Lịch sử đọc</h2>
            </div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data && data.length > 0 && data.map((item: any, index: number) => {
                    const latestChapter = getLatestChapter(item.list_chapter);
                    return (
                        <div key={index} className="p-2 flex">
                            <div className="p-4 h-32 relative overflow-hidden flex bg-btn hover:bg-[#1a2539] hover:border-[#263855] border border-btnHover rounded-lg transition-all duration-300 flex-grow w-full">
                                <button onClick={() => handleRemove(item.id)} className="absolute top-2 right-2 text-[#747c88] w-[1.7rem] h-[1.7rem] flex justify-center items-center rounded-full bg-[#0e1726] hover:text-white hover:bg-[#111c2d] transition-all duration-300">
                                    <FaXmark />
                                </button>
                                <Link href={`/${item.comic.slug}`} className="w-[4.1rem] block flex-shrink-0 rounded-md overflow-hidden transition-all duration-300">
                                    <div className="relative pb-[140%]">
                                        <img src={item.comic.thumbnail} alt="" className="absolute w-ful h-full top-0 left-0" />
                                    </div>
                                </Link>
                                <div className="pl-4 flex-grow w-[1px] transition-all duration-300">
                                    <div className="mt-[.3rem] flex items-center mb-[.6rem]">
                                        <span className="text-[.9rem] text-[#3c8bc6]">{renderStatus(item.comic.status)}</span>
                                    </div>
                                    <Link href={`/${item.comic.slug}`} className="text-white overflow-hidden text-ellipsis whitespace-nowrap block text-[1.05rem] transition-all duration-300">
                                        {item.comic.name}
                                    </Link>
                                    {latestChapter && (
                                        <p className="mt-[.4rem] text-[.9rem] text-[#3c8bc6] hover:text-white transition-all duration-300">
                                            <Link href={`/${item.comic.slug}/chuong-${latestChapter}`}>Chapter {latestChapter}</Link>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {data && data.length === 0 && <div className="text-white text-center w-full font-bold text-lg">Không có dữ liệu</div>}
            {data && data.length !== 0 && <PaginateComic currentPage={currentPage} totalPage={totalPages} onPageChangeCustom={handlePageChange} />}
        </div>
    );
}

export default Page;