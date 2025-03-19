import { FaChevronLeft, FaChevronRight, FaSort } from "react-icons/fa";

function Navigation({active, setActive, title, handlePrev, handleNext}: {active: boolean, setActive: any, title: string, handlePrev: any, handleNext: any}) {
    return (  
        <nav className="flex mb-2">
            <button aria-label="Prev" onClick={handlePrev} className="w-16 py-4 flex items-center justify-center rounded-lg bg-[#182335] hover:bg-[#1e2c43] hover:text-white text-[#8f96a0] leading-[1.9rem] whitespace-nowrap">
                <FaChevronLeft />
            </button>
            <button onClick={() => setActive(!active)} className="mx-2 w-full justify-between flex items-center rounded-lg py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white text-[#8f96a0] eading-[1.9rem] whitespace-nowrap">
                <b className="text-white">{title}</b>
                <FaSort />
            </button>
            <button aria-label="Next" onClick={handleNext} className="w-16 py-4 flex items-center justify-center rounded-lg bg-[#182335] hover:bg-[#1e2c43] hover:text-white text-[#8f96a0] leading-[1.9rem] whitespace-nowrap">
                <FaChevronRight />
            </button>
        </nav>
    );
}

export default Navigation;