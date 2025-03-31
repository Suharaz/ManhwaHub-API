/* eslint-disable @next/next/no-img-element */
import Ranking, { RankingTable } from "@/components/List/Ranking";
import BlogList from "@/components/Pages/Blog";
import { EmblaCarousel, ScheduleSlide, TrendingCarousel } from "@/components/Slider";
import Image from "next/image";
import Link from "next/link";
import { getComics } from "@/services/comics";
import { HomeProp } from "@/types/ComicProp";
import { difference, formatDate } from "@/utils/date";
import { renderStatus} from "@/utils/status";
import { formatView } from "@/utils/view";
import type { Metadata } from 'next';
import Header from "@/components/Header/Guest";
import Footer from "@/components/Footer";
import ButtonScroll from "@/components/Button/ScrollToTop";

export default async function Home() {
  const data: HomeProp = await getComics();
  
  return (
    <>
   
    <Header/>
    <main className="bg-gradient-5" itemScope itemType="https://schema.org/WebPage">
      
      
      <section className="py-10">
       
        <div className="max-w-[1800px] mx-auto overflow-hidden">
          <div className="mb-2 px-[10px] text-center sm:text-left">
            <h2 className="text-[30px] w-full justify-center sm:justify-between flex-col sm:flex-row inline-flex items-center font-[900] font-pro-bold text-white uppercase">
              Phổ Biến
              <Link href={`/danh-sach/truyen-hot`} className="pt-1 text-[16px] text-center sm:text-[20px] sm:pt-0 text-greyLight hover:text-white transition-all duration-300 font-[400] uppercase inline-block">
                Xem thêm
              </Link>
            </h2>
          </div>
          <TrendingCarousel data={data.comicsPopular} />
        </div>
      </section>
      <section>
        
        <article className="max-w-[1800px] mx-auto px-[10px]">
          <div className="center">
            <div className="col-span-4 xl:col-span-3">
              <div className="mb-2 text-center sm:text-left">
                <h2 className="text-[30px] w-full justify-center sm:justify-between flex-col sm:flex-row inline-flex items-center font-[900] font-pro-bold text-white uppercase">
                  Mới Cập Nhật
                  <Link href={`/danh-sach/truyen-moi-cap-nhat`} className="pt-1 text-[16px] hover:text-white transition-all duration-300 text-center sm:text-[20px] sm:pt-0 text-greyLight font-[400] uppercase inline-block">
                    Xem thêm
                  </Link>
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                {data.comicsRecent.map((item, index) => (
                  <div className="bg-mainSec relative transition-all group" key={index} title={item.name}>
                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`} className="relative w-full overflow-hidden block bg-whiteCustom1 pb-[130%] after:absolute after:content-[''] after:top-[40%] after:left-0 after:right-0 after:bottom-0 after:z-[2] after:bg-gradient-4">
                      <div className="absolute bottom-1 z-10 left-1">
                        <div className="text-[11px] font-bold font-sans inline-block rounded-sm py-[2px] px-[4px] bg-white text-black">
                          {formatView(item.view_total)}
                        </div>
                      </div>
                      <Image src={item.thumbnail} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" className="group-hover:scale-110 transition-all object-cover" alt={item.name}/>
                    </Link>
                    <div className="text-[#aaa] text-[12px] px-2 py-2 min-h-[84px]">
                      <h3 className="text-[15px] text-white leading-[1.3em] font-medium mb-[8px] h-[37px] line-clamp-2 text-ellipsis">
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`}>{item.name}</Link> 
                      </h3>
                      <div className="line-clamp-1 text-ellipsis"> <span>{renderStatus(item.status)}</span> <span className="dot"></span> <span className="fdi-item fdi-duration">{formatDate(item.updated_at)}</span> </div>
                      {item.Chapters && item.Chapters.length > 0 && 
                      <ul className="mt-1">
                        {item.Chapters.map((chapter, index) => (
                          <li key={index} className="line-clamp-1 text-ellipsis">
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}/${chapter.id}`} className="text-greyLight1 hover:text-white min-h-7 transition-all items-center duration-300 line-clamp-1 text-ellipsis whitespace-nowrap bg-[#141d2c] hover:bg-[#111925] rounded-full flex justify-center 2xsm:justify-between text-[.8rem] mt-[.3rem] px-[.8rem] overflow-hidden">
                              <span className="mr-4">{chapter.name}</span>
                              <span className="line-clamp-1 text-ellipsis 2xsm:block hidden">{difference(chapter.updated_at)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>}
                     
                    </div>
                  </div>
                ))}
              </div>
                            
            </div>
                      </div>
        </article>
      </section>
    </main>
    <Footer />
    <ButtonScroll />
    </>
  );
}
