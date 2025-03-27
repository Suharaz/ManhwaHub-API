"use client"
import { getAuthToken } from "@/hooks/useAuth";
import axiosClient from "@/libs/axiosClient";
import { ChapterProp } from "@/types/ComicProp";
// import { renderFlagCountry } from "@/utils";
import { difference } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBitcoin, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

type RatingProp = {
    id: number,
    content: string,
    value: number,
    user_id: number,
    updated_at: string,
    User: {
        id: number,
        name: string,
        avatar: string
    }
}

type RatingResponseProp = {
    status: string,
    data: RatingProp[],
    meta: {
        currentPage: number,
        totalPages: number,
        totalRatings: number
    }
}

function ListChapter({chapters, slug, id}: {chapters: ChapterProp[], slug: string, id:number}) {
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState<any>([]);
    const [sort, setSort] = useState<string>("desc");
    const [activeTab, setActiveTab] = useState<string>("chapters");
    const [ratings, setRatings] = useState<RatingProp[]>([]);
    const [ratingsMeta, setRatingsMeta] = useState<{
        currentPage: number,
        totalPages: number,
        totalRatings: number
    }>({
        currentPage: 1,
        totalPages: 1,
        totalRatings: 0
    });
    const [groupedChaptersArray, setGroupedChaptersArray] = useState(
        Object.entries(
            chapters.reduce((acc: { [key: number]: ChapterProp[] }, chapter) => {
                if (!acc[chapter.chapter_number]) {
                    acc[chapter.chapter_number] = [];
                }
                acc[chapter.chapter_number].push(chapter);
                return acc;
            }, {})
        ).reverse()
    );

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if(token) {
                const getHistory = async () => {
                    axiosClient.get("/api/user/"+id+"/history" ).then((res) => {
                        if(res.data.status == "success"){
                            setHistory(res.data.list);
                        }
                    });
                }
                getHistory();
            }
        }
        checkAuth();
    }, [id]);

    useEffect(() => {
        if (activeTab === "ratings") {
            fetchRatings();
        }
    }, [activeTab, id]);

    const fetchRatings = async () => {
        try {
            const response = await axiosClient.get<RatingResponseProp>(`/api/comics/${id}/rating`);
            if (response.data.status === "success") {
                setRatings(response.data.data);
                setRatingsMeta(response.data.meta);
            }
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá:", error);
        }
    };

    const handleSort = () => {
        if(sort == "asc"){
            setSort("desc");
            // chapters.sort((a: ChapterProp, b: ChapterProp) => b.chapter_number - a.chapter_number);
            setGroupedChaptersArray([...groupedChaptersArray.reverse()]);
        } else {
            setSort("asc");
            // chapters.sort((a: ChapterProp, b: ChapterProp) => a.chapter_number - b.chapter_number);
            setGroupedChaptersArray([...groupedChaptersArray.reverse()]);
        }
    }

    const renderStars = (value: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar 
                    key={i} 
                    className={i <= value ? "text-yellow-400" : "text-gray-300"} 
                    size={16} 
                />
            );
        }
        return (
            <div className="flex">{stars}</div>
        );
    };

    return (
    <div>
        <div className="border-b border-solid border-[#ccc] mb-[20px] flex justify-between">
            <div className="flex">
                <h3 
                    className={`flex items-center tracking-[1.5px] border-b border-solid font-primary text-xl max-w-max font-bold capitalize mr-6 cursor-pointer ${activeTab === "chapters" ? "border-primary" : "border-transparent"}`}
                    onClick={() => setActiveTab("chapters")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                    </svg>Danh sách Chương
                </h3>
                <h3 
                    className={`flex items-center tracking-[1.5px] border-b border-solid font-primary text-xl max-w-max font-bold capitalize cursor-pointer ${activeTab === "ratings" ? "border-primary" : "border-transparent"}`}
                    onClick={() => setActiveTab("ratings")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                    </svg>Đánh giá
                </h3>
            </div>
            {activeTab === "chapters" && (
                <div className="mr-3">
                    <button aria-label="Sort" onClick={handleSort}>
                        {sort != "asc" ? <FaSortAmountDown size={25} /> : <FaSortAmountUp size={25} />}
                    </button>
                </div>
            )}
        </div>
        
        {activeTab === "chapters" ? (
            <>
                <div className="flex pb-2">
                    <div className="pl-2 text-[17px] w-[50%] font-bold">Số chương</div><div className="text-[17px] w-[50%] text-center font-bold">Cập nhật</div>
                </div>
                <ul className={`relative ${!show ? 'max-h-[850px] overflow-auto' : ''} overflow-hidden border border-solid border-[#ccc] p-3 rounded-lg`} itemScope itemType="https://schema.org/ItemList" itemProp="itemlist">
                    {groupedChaptersArray.length > 0 && <>
                    {!show && <li onClick={() => setShow(true)} aria-label="More" className="text-white bg-btn hover:bg-btnHover font-bold absolute bottom-0 right-0 left-0 z-10">
                        <div className="flex justify-center items-center m-1 cursor-pointer border border-solid border-[#ddd] px-3 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                            </svg>
                            Xem Thêm
                        </div>
                    </li>}
                    {groupedChaptersArray.map(([name, chapters]) => (
                    <li key={name}
                        itemScope
                        itemType="https://schema.org/ListItem"
                        itemProp="itemListElement">
                            <Link href={`/${slug}/${chapters[0].id}`} className="flex hover:bg-btnHover py-4 p-3">
                                <div className="w-[50%] truncate flex flex-col">
                                    <div className="flex items-center">
                                        <span className={`font-bold ${ history.map((item: any) => Number(item)).includes(chapters[0].id) ? 'text-[#00C3FF]' : 'text-white'}`}>{chapters[0].name}{chapters[0].title && chapters[0].title != "" && `: ${chapters[0].title}` }</span>
                                        {chapters[0].price != 0 && <i className="text-yellowPrimary text-sm flex gap-1 items-center ml-2">{chapters[0].price}<FaBitcoin /></i>}
                                    </div>
                                    {chapters[0].translator && <span className="w-full text-tiny text-greyLight group-hover:text-current">
                                        <div className="flex flex-row gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                            <p className="text-[13px] line-clamp-1">{chapters[0].translator.name}</p>
                                        </div>
                                    </span>}
                                </div> 
                                <div className="w-[50%] truncate text-center flex items-center justify-center">{difference(chapters[0].updated_at)}</div>
                            </Link>
                    </li>
                    ))}
                    </>}
                </ul>
            </>
        ) : (
            <div className="border border-solid border-[#ccc] p-4 rounded-lg">
                <div className="mb-3 text-lg font-bold">Tổng số đánh giá: {ratingsMeta.totalRatings}</div>
                {ratings.length > 0 ? (
                    <ul className="space-y-4">
                        {ratings.map((rating) => (
                            <li key={rating.id} className="border-b border-gray-700 pb-3">
                                <div className="flex items-start mb-2">
                                    {rating.User.avatar && (
                                        <div className="mr-3 self-start" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                            <Image 
                                                src={rating.User.avatar} 
                                                alt={rating.User.name}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="font-medium text-white">{rating.User.name}</div>
                                        <div>
                                            {renderStars(rating.value)}
                                        </div>
                                        <div className="text-sm mt-2 mb-1">{rating.content}</div>
                                        <div className="text-xs text-gray-400">{difference(rating.updated_at)}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8">Chưa có đánh giá nào</div>
                )}
            </div>
        )}
    </div>
    );
}

export default ListChapter;