import { useDisclosure } from "@chakra-ui/react";
import { FaTriangleExclamation } from "react-icons/fa6";
import ModalReport from "../Modal/Report";

function ButtonReport({name, chapter, id}: {name: string, chapter: string, id: number}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (  
        <>
        <button onClick={onOpen} className="mb-6 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap">
            <FaTriangleExclamation size={21} />
            <span>Báo Lỗi</span>
        </button>
        <ModalReport isOpen={isOpen} onClose={onClose} name={name} chapter={chapter} id={id} />
        </>
    );
}

export default ButtonReport;