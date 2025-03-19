/* eslint-disable @next/next/no-img-element */
import { BlogProp } from "@/types/BlogProp";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

function BlogList({data}: {data: BlogProp[]}) {
    return (  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
            {data.map((item, index: number) => (
            <div key={index} className="group" title={item.title}>
                <Link className="block relative overflow-hidden rounded-2xl" href={`/tin-tuc/${item.slug}`}>
                    <div>
                        <Image src={item.poster} alt={item.title} className="w-full h-[250px] group-hover:scale-105 transition-all duration-300" width={300} height={280} />
                    </div>
                    <div className="relative block bg-mainSide py-[30px] px-[20px] text-start">
                        <div className="mb-2 items-center flex justify-between">
                            <p className="text-[16px] text-mediumGray">
                                {formatDate(item.created_at)}
                            </p>
                        </div>
                        <h3 className="text-[25px] font-bold leading-[30px] uppercase mb-[20px] font-pro-semi-bold text-white hover:text-[#d0e6a5] transition-all duration-300 line-clamp-2 text-ellipsis">{item.title}</h3>
                        <div className="flex items-center">
                            <img src={item.user.avatar} loading="lazy" alt="author" className="rounded-lg w-12 h-12" width={50} height={50} />
                            <h4 className="text-[18px] font-normal text-mediumGray pl-[15px]">{item.user.name}</h4>
                        </div>
                    </div>
                </Link>
            </div>
            ))}
        </div>
    );
}

export default BlogList;