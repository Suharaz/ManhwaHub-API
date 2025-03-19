import { FaCaretRight, FaChevronRight } from "react-icons/fa";

function NavigationPage({ active, setActive, totalPage, currentPage, handlePageClick }: { active: boolean, setActive: any, totalPage: number, currentPage: number, handlePageClick: any }) {
    return (  
        <div className={`${active ? 'w-[19rem]' : 'w-0'} absolute bg-[#0e1726] top-0 xl:top-[4.3rem] bottom-0 right-0 shadow-10 z-[160] overflow-y-auto overflow-x-hidden transition-width duration-300`}>
            <div className="flex items-center bg-[#182335] justify-between py-2 px-6 h-14 border-b border-b-[#1e2c43]">
                <span></span>
                <div onClick={() => setActive(!active)} className="w-[2rem] cursor-pointer h-[2rem] flex justify-center items-center flex-shrink-0 text-white bg-[#1e2c43] font-normal text-center select-none text-[1rem] leading-[1.5] rounded-[.5rem] transition-all" aria-label="Close">
                    <FaChevronRight />
                </div>
            </div>
            <ul className="h-full">
                {totalPage > 0 && Array.from({ length: totalPage }, (_, index) => (
                    <li key={index}>
                        <div onClick={() => handlePageClick(index)} className={`transition-all duration-500 cursor-pointer ${index === currentPage ? 'text-[#8bbadd] font-bold bg-[#182335]' : 'text-mediumGray'} py-3 px-5 flex items-center overflow-hidden whitespace-nowrap text-ellipsis border-b border-b-[#182335]`}>
                            {index === currentPage && <FaCaretRight size={25} />}
                            Trang {index + 1}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavigationPage;