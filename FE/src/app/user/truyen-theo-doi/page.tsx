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
import 'react-toastify/dist/ReactToastify.css';
import { UserProp } from "@/types/UserProp";
import useLocalStorage from "@/hooks/useLocalStorage";
import { difference, formatDate } from "@/utils/date";

function Page() {
    const [user, setUser] = useLocalStorage<UserProp | null>('user', null);
    const [follows, setFollows] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const {showToast} = useToast();
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            await axiosClient.get('/api/user/'+user?.id+'/followed-comics?page=' + currentPage)
                .then(res => {
                    if (res.data.status === "success") {
                        setFollows(res.data.follows || []);
                        
                        if (res.data.pagination) {
                            setPagination(res.data.pagination);
                            setCurrentPage(res.data.pagination.page);
                        }
                    } else {
                        setFollows([]);
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
        axiosClient.delete(`/api/comics/${id}/unfollow`).then((res) => {
            setReload(!reload);
            showToast(res.data.message, {type: "success"});
        });
    }

    // Hàm tạo đường dẫn slug cho chapter
    const getChapterSlug = (chapterNumber: number) => {
        return `chuong-${chapterNumber}`;
    }

    return (  
        <div className="mb-10">
            <ToastContainer transition={Zoom} />
            <div className="mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center">Truyện theo dõi</h2>
            </div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {follows && follows.length > 0 && follows.map((item: any, index: number) => {
                    const latestChapter = item.comic.Chapters && item.comic.Chapters.length > 0 ? 
                        item.comic.Chapters[item.comic.Chapters.length - 1] : null;
                    
                    return (
                        <div key={index} className="p-2 flex">
                            <div className="p-4 h-32 relative overflow-hidden flex bg-btn hover:bg-[#1a2539] hover:border-[#263855] border border-btnHover rounded-lg transition-all duration-300 flex-grow w-full">
                                <button onClick={() => handleRemove(item.comic.id)} className="absolute top-2 right-2 text-[#747c88] w-[1.7rem] h-[1.7rem] flex justify-center items-center rounded-full bg-[#0e1726] hover:text-white hover:bg-[#111c2d] transition-all duration-300">
                                    <FaXmark />
                                </button>
                                <Link href={`/${item.comic.slug || item.comic.id}`} className="w-[4.1rem] block flex-shrink-0 rounded-md overflow-hidden transition-all duration-300">
                                    <div className="relative pb-[140%]">
                                        <img src={item.comic.thumbnail} alt="" className="absolute w-ful h-full top-0 left-0" />
                                    </div>
                                </Link>
                                <div className="pl-4 flex-grow w-[1px] transition-all duration-300">
                                    <div className="mt-[.3rem] flex items-center mb-[.6rem]">
                                        <span className="text-[.9rem] text-[#3c8bc6]">{renderStatus(item.comic.status || 0)}</span>
                                    </div>
                                    <Link href={`/${item.comic.slug }`} className="text-white overflow-hidden text-ellipsis whitespace-nowrap block text-[1.05rem] transition-all duration-300">
                                        {item.comic.name}
                                    </Link>
                                    {latestChapter && (
                                        <p className="mt-[.4rem] text-[.9rem] text-[#3c8bc6] hover:text-white transition-all duration-300">
                                            <Link href={`/${item.comic.slug || item.comic.id}/${latestChapter.id}`}>
                                                Chapter {latestChapter.chapter_number} - {difference(latestChapter.updated_at)}
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {follows && follows.length === 0 && <div className="text-white text-center w-full font-bold text-lg">Không có dữ liệu</div>}
            {pagination && follows && follows.length !== 0 && <PaginateComic currentPage={currentPage} totalPage={pagination.totalPages} onPageChangeCustom={handlePageChange} />}
        </div>
    );
}

export default Page;