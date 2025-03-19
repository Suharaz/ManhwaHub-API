import dynamic from "next/dynamic";
import { Suspense } from "react";

const NavigationPage = dynamic(() => import("../Navigation/Page"), { ssr: false });
const NavigationChapter = dynamic(() => import("../Navigation/Chapter"), { ssr: false });
const NavigationComment = dynamic(() => import("../Navigation/Comment"), { ssr: false });

function ReadDynamic({ data, images, isOpenPage, setIsOpenPage, isOpenChapter, setIsOpenChapter, isOpenComment, setIsOpenComment, currentPage, handlePageClick }: { data: any, images: any, isOpenPage: boolean, setIsOpenPage: any, isOpenChapter: boolean, setIsOpenChapter: any, isOpenComment: boolean, setIsOpenComment: any, currentPage: number, handlePageClick: any }) {
    return (  
        <Suspense fallback={<div>Loading...</div>}>
            <NavigationPage active={isOpenPage} setActive={setIsOpenPage} totalPage={images.length} currentPage={currentPage} handlePageClick={handlePageClick} />
            <NavigationChapter currentChapter={data.currentChapter} data={data.comic} active={isOpenChapter} setActive={setIsOpenChapter} />
            <NavigationComment id={data.comic.id} chapter_id={data.currentChapter.id} active={isOpenComment} setActive={setIsOpenComment} />
        </Suspense>
    );
}

export default ReadDynamic;