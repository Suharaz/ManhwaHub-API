"use client"
import { ComicProp } from "@/types/ComicProp";
import HeaderFilter from "../HeaderFilter";
import ItemComic from "../ItemComic";
import PaginateComic from "./Paginate";
import { useState } from "react";
import { PaginateComicProps } from "@/types";

function FilterComic({data}: any) {
    const [fullData, setFullData] = useState<PaginateComicProps | null>(null);
    return (  
        <>
            <HeaderFilter categories={data.categories} setData={setFullData} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {fullData?.data.map((comic: ComicProp) => (
                    <div key={comic.id} className="flex">
                        <ItemComic comic={comic} />
                    </div>
                ))}
            </div>
            {fullData && <PaginateComic currentPage={fullData.current_page} totalPage={fullData.last_page} />}
        </>
    );
}

export default FilterComic;