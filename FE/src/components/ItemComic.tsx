"use client"
import { ComicProp } from "@/types/ComicProp";
import { difference } from "@/utils/date";
import { renderStatus } from "@/utils/status";
import Image from "next/image";
import Link from "next/link";
import ReactTooltip from 'react-tooltip';

function ItemComic({comic}: {comic: ComicProp}) {
    return (  
    <div className="flex bg-btn hover:bg-[#1a2539] hover:border-[#263855] border border-[#1e2c43] rounded-lg transition-all w-full flex-grow h-[12.6rem] duration-300">
        <div className="w-[8.8rem] group flex-shrink-0 rounded-[.3rem] block transition-all duration-300">
            <div className="relative pb-[140%]">
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`} data-tip data-for={`tooltip-${comic.id}`}>
                    <Image width={150} height={200} src={comic.thumbnail} alt={comic.name} className="absolute h-full w-full left-0 top-0" />
                </Link>
                <ReactTooltip id={`tooltip-${comic.id}`} 
                    place="right"
                    className="max-ssm:hidden !bg-[#1e2c43] pointer-events-none border !opacity-100 !py-[1.9rem] !px-6 !border-[#263855] group-hover:pointer-events-auto max-w-[320px] transition-all min-w-[320px] w-[320px] duration-300">
                        <div className="rounded-lg w-full text-[#8f96a0] overflow-hidden relative leading-[18px]">
                            <span className="text-[#8bbadd] uppercase tracking-[.2rem] text-[.95rem] font-medium block mb-[.8rem]">{renderStatus(comic.status)}</span>
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`} className="text-white leading-[18px] line-clamp-2 text-ellipsis text-[1.2rem] font-medium">
                                {comic.name}
                            </Link>
                            <div dangerouslySetInnerHTML={{__html: comic.content}} className="text-[.9rem] my-[.8rem] text-[#747c88] line-clamp-2 text-ellipsis"></div>
                            <nav className="flex flex-wrap gap-[.2rem] max-h-[60px] overflow-hidden">
                                {comic.categories && comic.categories.length > 0 && comic.categories.map((category) => (
                                    <Link key={category.id} href={`/the-loai/${category.slug}`} className="bg-btn hover:bg-[#141d2c] hover:text-white py-1 px-[.8rem] rounded-full text-[.9rem] border border-btnHover font-medium">
                                        {category.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                </ReactTooltip>
            </div>
        </div>
        
        <div className="flex-grow w-[1px] transition-all duration-300 p-4">
            <div className="flex items-center mb-[.6rem]"><span className="text-[#3c8bc6] text-[13px]">{renderStatus(comic.status)}</span></div>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`} className="text-white overflow-hidden text-ellipsis whitespace-nowrap block text-[1.05rem] transition-all duration-300">
                {comic.name}
            </Link>
            {comic.chapters && comic.chapters.length > 0 && <ul className="mt-4">
                {comic.chapters.map((chapter) => (
                    <li key={chapter.id}>
                        <Link className="bg-[#141d2c] rounded-full flex justify-between text-[.9rem] mt-[.3rem] py-[.2rem] px-[.8rem] hover:text-white hover:bg-[#111925] text-[#747c88] overflow-hidden transition-all duration-300" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}/${chapter.slug}`}>
                            <span className="whitespace-nowrap">Chapter {chapter.name}</span>
                            <span className="whitespace-nowrap max-ssm:pl-5 text-ellipsis overflow-hidden">{difference(chapter.updated_at)}</span>
                        </Link>
                    </li>
                ))}
            </ul>}
        </div>
    </div>
    );
}

export default ItemComic;