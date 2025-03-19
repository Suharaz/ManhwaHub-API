/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import PaginateComic from "@/components/Client/Paginate";
import axiosClient from "@/libs/axiosClient";
import { difference } from "@/utils/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProp } from "@/types/UserProp";
import useLocalStorage from "@/hooks/useLocalStorage";

function Page() {
    const [user, setUser] = useLocalStorage<UserProp | null>('user', null);
    const [data, setData] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            await axiosClient.get('/api/user/'+user?.id+'/comment?page=' + currentPage)
                .then(res => {
                    setData(res.data.data);
                    setCurrentPage(res.data.data.pagination.page);
                })
                .catch(() => {
                    router.push('/');
                });
        }
        fetchData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (  
        <div className="mb-10">
            <div className="flex justify-between mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center">Bình luận</h2>
            </div>

            {data && data.comments && data.comments.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-[#121a29] border-collapse">
                        <thead>
                            <tr className="bg-[#1a2942] text-gray-300 text-left">
                                <th className="py-3 px-4 font-semibold w-16"></th>
                                <th className="py-3 px-4 font-semibold">Truyện</th>
                                <th className="py-3 px-4 font-semibold">Bình luận</th>
                                <th className="py-3 px-4 font-semibold w-32">Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.comments.map((item: any, index: number) => (
                                <tr key={index} className={`${index % 2 === 0 ? 'bg-[#0f172a]' : 'bg-[#121a29]'} hover:bg-[#1e2c43] transition-all duration-300 border-b border-[#1a2942]`}>
                                    <td className="py-3 px-4">
                                        <div className="w-12 h-16 overflow-hidden rounded-md">
                                            <img 
                                                src={item.Comic.thumbnail} 
                                                alt="" 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Link href={`/${item.Comic.slug}`} className="text-[#c6cacf] hover:text-white font-medium transition-all duration-300">
                                            {item.Comic.name}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-[#a4aab3] max-w-xl" dangerouslySetInnerHTML={{ __html: item.content }} />
                                    </td>
                                    <td className="py-3 px-4 text-[#747c88] text-sm">
                                        {difference(item.created_at)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-10 text-gray-400">
                    Không có bình luận nào
                </div>
            )}

            {data && data.comments && data.comments.length !== 0 && 
                <div className="mt-5">
                    <PaginateComic 
                        currentPage={currentPage} 
                        totalPage={data.pagination.totalPages} 
                        onPageChangeCustom={handlePageChange} 
                    />
                </div>
            }
        </div>
    );
}

export default Page;