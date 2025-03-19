import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

function PaginationCustom({ currentPage, totalPage, onPageChange }: {currentPage: number, totalPage: number, onPageChange: any}) {
    const getPageNumbers = () => {
        let pages = [];
        if (totalPage <= 7) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                pages = [1, 2, 3, 4, 5, "...", totalPage];
            } else if (currentPage >= totalPage - 3) {
                pages = [1, "...", totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
            } else {
                pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage];
            }
        }
        return pages;
    };
    return (  
        <nav className="flex items-center overflow-auto">
            <ul className="flex flex-wrap gap-1 justify-center">
                {currentPage > 1 && (
                <><li>
                    <button aria-label="First"
                        onClick={() => onPageChange(1)}
                        className="w-[2.6rem] h-[2.6rem] text-[14px] flex justify-center items-center rounded-full text-mediumGray bg-btn leading-[1.25] relative transition-all hover:bg-btnHover hover:text-white"
                        disabled={currentPage === 1}
                    >
                        <FiChevronsLeft />
                    </button>
                </li>
                <li>
                    <button aria-label="Previous"
                        onClick={() => onPageChange(currentPage - 1)}
                        className="w-[2.6rem] h-[2.6rem] text-[14px] flex justify-center items-center rounded-full text-mediumGray bg-btn leading-[1.25] relative transition-all hover:bg-btnHover hover:text-white"
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft className="mr-1" />
                    </button>
                </li></>)}
                {getPageNumbers().map((page, index) => (
                    <li key={index}>
                        {page === "..." ? (
                            <span className="w-[2.6rem] h-[2.6rem] text-[14px] flex justify-center items-center rounded-full text-mediumGray bg-btn leading-[1.25] relative transition-all hover:bg-btnHover hover:text-white">
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`${
                                    currentPage === page ? "bg-[#3c8bc6] text-white" : "text-mediumGray bg-btn hover:bg-btnHover hover:text-white"
                                } w-[2.6rem] h-[2.6rem] flex justify-center items-center rounded-full leading-[1.25] relative transition-all`}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
                {currentPage < totalPage && (
                <>
                <li>
                    <button aria-label="Next"
                        onClick={() => onPageChange(currentPage + 1)}
                        className="w-[2.6rem] h-[2.6rem] text-[14px] flex justify-center items-center rounded-full text-mediumGray bg-btn leading-[1.25] relative transition-all hover:bg-btnHover hover:text-white"
                        disabled={currentPage === totalPage}
                    >
                        <FaChevronRight className="ml-1" />
                    </button>
                </li>
                <li>
                    <button aria-label="Last"
                        onClick={() => onPageChange(totalPage)}
                        className="w-[2.6rem] h-[2.6rem] text-[14px] flex justify-center items-center rounded-full text-mediumGray bg-btn leading-[1.25] relative transition-all hover:bg-btnHover hover:text-white"
                        disabled={currentPage === totalPage}
                    >
                        <FiChevronsRight />
                    </button>
                </li>
                </>
                )}
            </ul>
        </nav>
    );
}

export default PaginationCustom;