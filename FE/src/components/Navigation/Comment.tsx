import { FaChevronRight } from "react-icons/fa";
import CommentComic from "../Comment/Comic";
import { useEffect, useState } from "react";

function NavigationComment({active, setActive, id, chapter_id}:{active: boolean, setActive: any, id: number, chapter_id: number}) {
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (active && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [active, hasLoaded]);

    return (  
        <div className={`${active ? 'w-full lg:w-[900px]' : 'w-0'} absolute bg-[#0e1726] top-0 xl:top-[4.3rem] bottom-0 right-0 shadow-10 z-[160] overflow-y-auto overflow-x-hidden transition-width duration-300`}>
            <div className="flex items-center bg-[#182335] justify-between py-2 px-6 h-14 border-b border-b-[#1e2c43]">
                <span className="text-white">
                    Bình luận
                </span>
                <div onClick={() => setActive(!active)} className="w-[2rem] cursor-pointer h-[2rem] flex justify-center items-center flex-shrink-0 text-white bg-[#1e2c43] font-normal text-center select-none text-[1rem] leading-[1.5] rounded-[.5rem] transition-all" aria-label="Close">
                    <FaChevronRight />
                </div>
            </div>
            <div className="p-3">
                {hasLoaded && <CommentComic bg={true} id={id} chapter_id={chapter_id} />}
            </div>
        </div>
    );
}

export default NavigationComment;