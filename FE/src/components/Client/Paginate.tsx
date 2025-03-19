"use client"

import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import PaginationCustom from "../Pagination";

function PaginateComic({ currentPage, totalPage, onPageChangeCustom }: {currentPage: number, totalPage: number, onPageChangeCustom?: (page: number) => void}) {
    const pathName = usePathname();
    const router = useRouter();
    const onPageChange = (page: number) => {
        if(onPageChangeCustom) {
            onPageChangeCustom(page);
        }else {
            router.push(pathName + `?page=${page}`);
        }
    }
    return (
        <div className="flex justify-center mt-4 overflow-auto">
            <PaginationCustom currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChange} />
        </div>
    );
}

export default PaginateComic;