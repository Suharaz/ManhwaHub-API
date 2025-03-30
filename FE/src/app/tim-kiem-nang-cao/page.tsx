/* eslint-disable @next/next/no-img-element */
import PaginateComic from "@/components/Client/Paginate";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import HeaderFilter from "@/components/HeaderFilter";
import { getComicsByCategory, getSreach } from "@/services/comics";
import { ComicProp } from "@/types/ComicProp";
import { formatView } from "@/utils/view";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { difference } from "@/utils/date";
import { renderStatus } from "@/utils/status";
import Image from "next/image";
import Link from "next/link";
import ReactTooltip from 'react-tooltip';
import { FaBitcoin } from "react-icons/fa";
interface CategoryResponse {
    status: string;
    data: {
        items: ComicProp[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            limit: number;
        };
        title: string;
    };
}
function ItemComic({comic}: {comic: ComicProp}) {
    return (  
    <div className="flex bg-btn hover:bg-[#1a2539] hover:border-[#263855] border border-[#1e2c43] rounded-lg transition-all w-full flex-grow h-[12.6rem] duration-300">
        <div className="w-[8.8rem] group flex-shrink-0 rounded-[.3rem] block transition-all duration-300">
            <div className="relative pb-[140%]">
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`} data-tip data-for={`tooltip-${comic.id}`}>
                    <Image width={150} height={200} src={comic.thumbnail} alt={comic.name} className="absolute h-full w-full left-0 top-0" />
                </Link>
               
            </div>
        </div>
        
        <div className="flex-grow w-[1px] transition-all duration-300 p-4">
            <div className="flex items-center mb-[.6rem]"><span className="text-[#3c8bc6] text-[13px]">{renderStatus(comic.status)}</span></div>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`} className="text-white overflow-hidden text-ellipsis whitespace-nowrap block text-[1.05rem] transition-all duration-300">
                {comic.name}
            </Link>
            {comic.Chapters && comic.Chapters.length > 0 && <ul className="mt-4">
                {comic.Chapters.map((chapter) => (
                    <li key={chapter.id}>
                        <Link className="bg-[#141d2c] rounded-full flex justify-between text-[.9rem] mt-[.3rem] py-[.2rem] px-[.8rem] hover:text-white hover:bg-[#111925] text-[#747c88] overflow-hidden transition-all duration-300" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}/${chapter.slug}`}>
                            <span className="whitespace-nowrap"> {chapter.name}</span>
                            {chapter.price !== 0 && <i className="text-yellowPrimary text-sm flex gap-1 items-center ml-2">{chapter.price}<FaBitcoin /></i>}
                            <span className="whitespace-nowrap max-ssm:pl-5 text-ellipsis overflow-hidden">{difference(chapter.updated_at)}</span>
                        </Link>
                    </li>
                ))}     
            </ul>}
        </div>
    </div>
    );
}
async function Page({params, searchParams}: {params: {slug: string}, searchParams: {page?: number}}) {
    const page = searchParams.page || 1;
    const response = await getSreach(params.slug, page) as CategoryResponse;
    
    if(response === null || response.status !== "success" || !response.data) {
        notFound();
    }
    
    const { data } = response;
  
    return (
        <>
            
            <Header />
            <main className="bg-gradient-5 pb-28 flex-grow relative block">
                <div className="container mx-auto overflow-hidden min-h-screen">
                    <section className="mt-12 mb-10">
                        
                        <div className="flex justify-between mb-6">
                            <h2 className="text-[1.3rem] sm:text-[1.65rem] flex items-center text-white">Truyện Tranh by keyword: {params.slug}</h2>
                            <span className="text-mediumGray">{formatView(data.pagination.totalItems)} bộ truyện</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                            {data.items.map((comic: ComicProp) => (
                                <div key={comic.id} className="flex">
                                    <ItemComic comic={comic} />
                                </div>
                            ))}
                        </div>
                        <PaginateComic currentPage={data.pagination.currentPage} totalPage={data.pagination.totalPages} />
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Page;
