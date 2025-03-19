"use client"
import { FaEarthAmericas } from "react-icons/fa6";
import { SlideFade, useDisclosure } from '@chakra-ui/react'
function DropDownServer({data, current}: {data: any, current: any}) {
    const { isOpen, onToggle } = useDisclosure()
    return (  
        <div className="relative">
            <button onClick={onToggle} className="flex items-center rounded-[.5rem] py-[.6rem] px-[1.5rem] bg-[#182335] hover:bg-[#1e2c43] hover:text-white transition-all text-[#8f96a0] leading-[1.9rem] whitespace-nowrap w-full justify-center" aria-label="dropdown"> 
                <FaEarthAmericas />
                <span className="mx-1">Máy Chủ: </span> 
                <b className="text-white font-normal">{current}</b> 
            </button>
            <SlideFade in={isOpen} offsetY='20px'>
            <div className={`max-h-[250px] overflow-auto shadow-lg w-full left-auto right-0 absolute top-full float-left z-999 min-w-[10rem] py-2 my-[.125rem] text-[1rem] text-mediumGray text-left bg-[#182335] rounded-lg`}>
                {data.map((item: any, index: number) => (
                    <button className={`overflow-hidden whitespace-nowrap text-ellipsis block w-full py-1 px-6 clear-both font-normal hover:bg-[#1e2c43] hover:text-white transition-all ${current == item.server_name ? 'text-[#3c8bc6] bg-[#1e2c43]' : ''}`} key={index}>
                        {item.server_name}
                    </button>
                ))}
            </div>
            </SlideFade>
        </div>
    );
}

export default DropDownServer;