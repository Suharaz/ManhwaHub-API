/* eslint-disable @next/next/no-img-element */
import BreadCrumb from "@/components/BreadCrumb";
import DropDown from "@/components/DropDown";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { FaEye, FaStar } from "react-icons/fa";
import ModalRating from "@/components/Modal/Rating";
import Link from "next/link";
import { IoMdBook } from "react-icons/io";
import { BsLightningChargeFill } from "react-icons/bs";
import { getComic } from "@/services/comics";
import { notFound } from "next/navigation";
import { DetailProp } from "@/types/ComicProp";
import { renderStatus } from "@/utils/status";
import { difference } from "@/utils/date";
import { formatView } from "@/utils/view";
import ListChapter from "@/components/List/Chapter";
import { GiStarFormation } from "react-icons/gi";
import Header from "@/components/Header/Guest";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import CommentComic from "@/components/Comment/Comic";
import GetHistory from "@/components/Client/History";
import ButtonScroll from "@/components/Button/ScrollToTop";
import DescriptionComic from "@/components/Client/Description";

// export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
//     const {slug} = params;
//     const data: DetailProp = await getComic(slug);
//     if(data === null) {
//         notFound();
//     }else if(data.status === "error") {
//         notFound();
//     }
//     const meta = data.meta;
//     return {
//       metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`),
//       title: meta.title_detail_comic,
//       description: meta.description_detail_comic,
//       keywords: meta.keywords_detail_comic,
//       referrer: 'origin-when-cross-origin',
//       openGraph: {
//         type: 'article',
//         locale: "vi_VN",
//         url: '/',
//         images: [data.comic.thumbnail],
//       },
//       alternates: {
//         canonical: '/',
//       },
//       robots: {
//         index: true,
//         follow: true,
//         nocache: true,
//         googleBot: {
//           index: true,
//           follow: false,
//           noimageindex: true,
//           'max-video-preview': -1,
//           'max-image-preview': 'large',
//           'max-snippet': -1,
//         },
//       }
//     }
// }

async function Detail({params}: {params: {slug: string}}) {
    const {slug} = params;
    const data: DetailProp = await getComic(slug);
    if(data === null) {
        notFound();
    }else if(data.status === "error") {
        notFound();
    }
    const comic = data.comic;
    const breadCrumb = [
        {title: "Trang Chủ", link: process.env.NEXT_PUBLIC_BASE_URL + "/"},
        {title: comic.name, link: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}
    ]
   
    return (  
        <>
       
        <Header />
        <main itemScope className="bg-gradient-5" itemType="https://schema.org/WebPage">
            {data.ads && <div className="flex justify-center">
            <a target="_blank" href={data.ads.url} className="mt-5 mb-7">
                <img src={data.ads.image} alt="qc" />
            </a>
            </div>}
            <BreadCrumb data={breadCrumb} />
            <div className="container px-[10px] mx-auto mt-[50px]" itemProp="mainEntity" itemScope itemType="https://schema.org/Book">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <aside className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:col-span-2">
                        <div className="w-[15rem] flex-shrink-0 rounded-md overflow-hidden block">
                            <div className="relative pb-[140%]">
                                <Image itemProp="image" itemScope src={comic.thumbnail} alt="cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                            </div>
                        </div>
                        <div className="text-white text-center sm:text-start">
                            <h1 itemProp="name" className="text-[2rem] my-[.5rem] leading-[2rem] font-medium font-pro-semi-bold">{comic.name}</h1>
                            <h2 className="text-[.95rem] font-normal italic text-mediumGray leading-[1.3rem] line-clamp-2 text-ellipsis">{comic.origin_name || ''}</h2>
                            <div className="font-normal text-[16px] block text-greyLight mb-5 mt-2">
                                <DescriptionComic description={comic.content} />
                            </div>
                            <div className="flex gap-1 items-center mb-1 justify-center sm:justify-start">
                                {[...Array(5)].map((_, index) => (
                                    index < comic.votes_avg_value ? <FaStar key={index} size={24} color="#FFDF00" /> : <CiStar key={index} size={26} />
                                ))}
                                <span className="leading-none">{comic.votes_avg_value}</span>
                                <ModalRating id={comic.id} />
                            </div>
                            <div className="flex items-center mb-[5px] gap-2 justify-center sm:justify-start">
                               
                               
                            </div>
                            {comic.Chapters.length > 0 && (
                            <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                                <Link href={`/${comic.slug}/${comic.Chapters[0].id}`} className="text-[22px] font-medium transition-all text-center border-2 border-yellowPrimary py-1 px-2 rounded-md hover:before:bg-yellowPrimary relative shadow-2xl  before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-yellowPrimary hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10 flex gap-1 items-center">
                                        <IoMdBook size={30} />
                                        Đọc ngay
                                    </span>
                                </Link>
                                <DropDown id={comic.id} />
                                <Link href={`/${comic.slug}/${comic.Chapters[comic.Chapters.length -1].id}`} className="text-[22px] font-medium transition-all text-center border-2 border-purplePrimary py-1 px-2 rounded-md hover:before:bg-purplePrimary relative shadow-2xl  before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-purplePrimary hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10 flex gap-1 items-center">
                                        <BsLightningChargeFill size={24} />
                                        Chap mới nhất
                                    </span>
                                </Link>
                               
                            </div>
                            )}
                        </div>
                    </aside>
                    <aside className="md:col-span-1 text-center sm:text-start">
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white mr-1">Tác giả:</span> 
                            <b className="text-yellowPrimary">
                                {comic.Authors.length > 0 && comic.Authors.map((author, index) => (
                                    <Link href={`/tac-gia/${author.slug}`} key={author.id} className="text-yellowPrimary hover:underline">{author.name}{index < comic.Authors.length - 1 && ', '}</Link>
                                ))}
                                {comic.Authors.length === 0 && 'Đang cập nhật'}
                            </b>
                        </p>
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white mr-1">Nhóm dịch:</span> 
                            <b className="text-yellowPrimary">
                                {comic.Translators.length > 0 && comic.Translators.map((translator, index) => (
                                    <Link href={`/nhom-dich/${translator.slug}`} key={translator.id} className="text-yellowPrimary hover:underline">{translator.name}{index < comic.Translators.length - 1 && ', '}</Link>
                                ))}
                                {comic.Translators.length === 0 && 'Đang cập nhật'}
                            </b>
                        </p>
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white">Cập nhật lần cuối:</span><span className="ml-1">{difference(comic.updated_at)}</span></p>
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white">Trạng thái:</span> <b className="text-yellowPrimary">{renderStatus(comic.status)}</b></p>
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white mr-1">Thể loại:</span> 
                            {comic.Categories && comic.Categories.map((category, index) => (
                                <Link href={`/the-loai/${category.slug}`} key={category.id} className="hover:underline">{category.name}{index < comic.Categories.length - 1 && ', '}</Link>
                            ))}
                            {!comic.Categories && 'Đang cập nhật'}
                        </p>
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white">Lượt theo dõi:</span> <b>{formatView(comic.follow_total)}</b></p>
                        <p className="text-greyLight font-normal text-[16px] block mb-[5px]"><span className="text-white">Lượt xem:</span> <b>{formatView(comic.view_total)}</b></p>
                    </aside>
                </section>
                <section className="mt-20">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-8 text-white">
                            <ListChapter id={comic.id} slug={comic.slug} chapters={comic.Chapters} />
                            
                            <CommentComic id={data.comic.id} />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            
                            
                            
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <Footer />
        <ButtonScroll />
        </>
    );
}

export default Detail;