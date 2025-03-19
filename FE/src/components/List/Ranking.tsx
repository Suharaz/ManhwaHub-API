"use client"
import { ComicProp } from "@/types/ComicProp";
import { formatView } from "@/utils/view";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function Ranking({title, number = false, data, href} : {title: string, number?:boolean, data: ComicProp[], href: string}) {
    return (  
        <div className="max-ssm:hidden">
            <Link href={href} className="font-medium block hover:text-[#3c8bc6] transition-all duration-300 text-[24px] my-[15px] text-center text-white capitalize sm:text-[28px] lg:mb-[20px] lg:text-[30px]">
                {title}
            </Link>
            {data.map((item, index) => (
            <div className="mb-[20px] rounded-md bg-mainSec" key={index} title={item.name}>
                <div className="block group">
                    <div className="grid grid-cols-12 pr-3">
                        {number && <div className="col-span-2 flex items-center justify-center">
                            <span className={`text-black text-center font-medium text-[46px] 2xl:text-[60px] block`} style={{WebkitTextStrokeWidth:'thin', WebkitTextStrokeColor: `${index == 0 ? '#F5CF49' : (index == 1 ? '#A958A5' : (index == 2 ? '#b4b4b4' : '#616161'))}`}}>
                                {index + 1}
                            </span>
                        </div>}
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`} className="col-span-3 overflow-hidden relative h-[140px]">
                            <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={item.thumbnail} className="group-hover:scale-105 transition-all duration-300 object-cover" alt="cover" />
                        </Link>
                        <div className={number ? 'col-span-6' : 'col-span-8'}>
                            <div className="p-[15px]">
                                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`} className="text-white transition-all duration-300 group-hover:text-[#d0e6a5] line-clamp-1 text-ellipsis">{item.name}</Link>
                                <div className="w-full flex flex-wrap overflow-hidden max-h-[3.5rem] gap-2 mt-[16px]">   
                                    {item.categories && item.categories.map((category, index) => (
                                    <Link href={`/the-loai/${category.slug}`} key={index}>
                                        <span className="border-2 hover:underline text-mediumGray font-medium border-mediumGray rounded-[5px] capitalize text-[12px] py-[2px] px-[5px]">
                                            {category.name}
                                        </span>
                                    </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 pb-2'>
                            <span className="text-greyLight flex flex-col items-center tracking-[1.5] pt-[60px] text-[15px]">
                                <FaRegEye size={20} />
                                <span>
                                    {formatView(item.view_total)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
}

export default Ranking;

export function RankingTable({day, week, month} : {day: ComicProp[], week: ComicProp[], month: ComicProp[]}) {
    const [active, setActive] = useState('day');
    const [data, setData] = useState(day);
    const handleClick = (type: string) => {
        setActive(type);
        if(type === 'day') {
            setData(day);
        } else if(type === 'week') {
            setData(week);
        } else {
            setData(month);
        }
    }
    return(
        <>
        <ul className="bg-mainSide text-white flex rounded-t-md">
            <li className="text-center flex-auto"><button onClick={() => handleClick('day')} className={`leading-[40px] w-full border-none text-[13px] rounded-s-md font-medium ${active == "day" ? 'text-[#cae962]' : ''}`}>Ngày</button></li>
            <li className="text-center flex-auto"><button onClick={() => handleClick('week')} className={`leading-[40px] w-full border-none text-[13px] font-medium ${active == "week" ? 'text-[#cae962]' : ''}`}>Tuần</button></li>
            <li className="text-center flex-auto"><button onClick={() => handleClick('month')} className={`leading-[40px] w-full border-none text-[13px] rounded-e-md font-medium ${active == "month" ? 'text-[#cae962]' : ''}`}>Tháng</button></li>
        </ul>
        <div className="bg-mainSec h-fit py-[15px] font-pro-semi-bold text-[14px] leading-[1.3em] anif-block-chart">
            <ul itemProp="itemList" itemScope itemType="https://schema.org/ItemList">
                {data.map((item, index) => (
                <li className="pt-[15px] ml-[60px] pr-[40px] pb-[15px] pl-[60px] border-b last:border-b-0 border-b-whiteCustom2 relative text-white" key={item.id}> 
                    <div className="absolute w-[40px] text-left -left-[40px] top-1/2 -translate-y-1/2">
                        <span className="border-b-[3px] font-bold text-[25px] border-b-[#cae962] pb-[6px]">0{index + 1}</span>
                    </div>
                    <div className="absolute w-[50px] pb-[60px] rounded-sm top-1/2 -translate-y-1/2 left-[15px] xl:left-0 bg-whiteCustom1 overflow-hidden block"> 
                        <Image src={item.thumbnail} itemProp="image" itemScope itemType='https://schema.org/ImageObject' className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={item.name} />
                    </div>
                    <div className="text-[#aaa] pl-5 xl:pl-0 text-[12px] leading-[1.2em] min-h-[60px] relative z-[2]">
                        <h3 className="line-clamp-2 text-ellipsis mb-[5px] font-medium text-[14px] leading-[1.4em]">
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`} className="text-white hover:text-[#d0e6a5]">{item.name}</Link> 
                        </h3>
                        <div className="text-[12px] leading-[1.2em] flex line-clamp-1 text-ellipsis">
                            <span className="whitespace-nowrap flex mr-5 items-center"><IoEyeSharp size={20} className="mr-1" />{formatView(item.view_total)}</span> 
                            <span className="whitespace-nowrap flex items-center"><FaHeart size={16} className="mr-1" />{formatView(item.votes_count)}</span> 
                        </div>
                    </div> 
                </li>
                ))}
            </ul>
        </div>
        </>
    )
}