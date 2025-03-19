"use client"
import { ChapterProp, ComicProp } from "@/types/ComicProp";
import Link from "next/link";
import { useState } from "react";
import { FaCaretRight, FaChevronRight, FaSearch } from "react-icons/fa";

function NavigationChapter({ active, setActive, data, currentChapter }: { active: boolean, setActive: any, data:ComicProp, currentChapter: ChapterProp }) {
    const [chapters, setChapters] = useState<ChapterProp[]>(data.chapters);
    const [keyword, setKeyword] = useState<string>('');

    const handleSearch = (e:any) => {
        const keyword = e.target.value;
        if (keyword) {
            const result = data.chapters.filter((item) => item.name.includes(keyword));
            setChapters(result);
        } else {
            setChapters(data.chapters);
        }
        setKeyword(keyword);
    }
    return (  
        <div className={`${active ? 'w-[19rem]' : 'w-0'} absolute bg-[#0e1726] top-0 xl:top-[4.3rem] bottom-0 right-0 shadow-10 z-[160] overflow-y-auto overflow-x-hidden transition-width duration-300`}>
            <div className="flex items-center justify-between py-2 px-6 h-14 border-b border-b-[#1e2c43]">
                <form autoComplete="off">
                    <div className="flex text-mediumGray justify-between items-center">
                        <FaSearch className="mr-1" />
                        <input value={keyword} onChange={handleSearch} type="text" placeholder="Nhập sô chap cần tìm" className="block w-full text-[1rem] bg-transparent focus:outline-none font-normal text-white rounded-[.5rem] leading-[1.5]" />
                    </div>
                </form>
                <div onClick={() => setActive(!active)} className="w-[2rem] cursor-pointer h-[2rem] flex justify-center items-center flex-shrink-0 text-white bg-[#1e2c43] font-normal text-center select-none text-[1rem] leading-[1.5] rounded-[.5rem] transition-all" aria-label="Close">
                    <FaChevronRight />
                </div>
            </div>
            <ul>
                {chapters.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${data.slug}/${item.id}`} className={`transition-all duration-500 cursor-pointer ${item.slug === currentChapter.slug ? 'text-[#8bbadd] font-bold bg-[#182335]' : 'text-mediumGray'} py-3 px-5 flex items-center overflow-hidden whitespace-nowrap text-ellipsis border-b border-b-[#182335]`}>
                            {item.slug === currentChapter.slug && <FaCaretRight size={25} />}
                            Chapter {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavigationChapter;