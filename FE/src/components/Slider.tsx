"use client"
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { EmblaOptionsType } from 'embla-carousel'
import { CategoryProp, ComicProp } from '@/types/ComicProp'
import { formatDate } from '@/utils/date'
import { renderStatus } from '@/utils/status'

export function EmblaCarousel({data}: {data: ComicProp[]}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <>
    {data.length > 0 && (
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {data.map((item, index: number) => (
            <div className="embla__slide w-full bg-cover bg-no-repeat relative" key={index}>
               <Image
                  src={item.thumbnail}
                  alt="Slide image"
                  layout="fill"
                  style={{objectFit:'cover'}}
                  priority={index === 0}
                />
              <div className="absolute inset-0 bg-[#000000] bg-opacity-90"></div>
              <div className="container mx-auto relative z-10">
                  <div className="banner-content h-[500px] ssm:h-[600px] lg:h-[700px] table-cell align-middle">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="lg:col-span-5 col-span-12 text-white">
                          <h2 className="text-[38px] ssm:text-[50px] ssm:mb-[20px] xl:text-[60px] font-bold tracking-[1.5px] leading-[1.1] line-clamp-2 text-ellipsis uppercase">{item.name}</h2>
                          <p className="text-[22px] mb-[15px] ssm:mb-[20px] uppercase">{renderStatus(item.status)}</p>
                          <div className='max-h-[80px] overflow-hidden'>
                          {item.categories && item.categories.map((category, index) => (
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/the-loai/${category.slug}`} key={index} className="mr-1 hover:text-black hover:bg-yellowPrimary hover:border-yellowPrimary duration-300 inline-block px-3 border-[2px] border-solid rounded-md border-mediumGray text-mediumGray capitalize text-[16px] font-medium mb-[20px]" tabIndex={-1}>{category.name}</Link>
                          ))}
                          </div>
                          <p className="font-medium text-[20px] block mb-2">{formatDate(item.created_at)}</p>
                          <div dangerouslySetInnerHTML={{ __html: item.content }} className="text-greyLight line-clamp-4 text-ellipsis text-base mb-5 ssm:mb-2"></div>
                          <div className='mt-10'>
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`} className="text-[24px] play-butn ssm:text-[40px] overflow-hidden relative before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-yellowPrimary hover:before:w-2/4 hover:before:bg-yellowPrimary hover:after:w-2/4 hover:after:bg-yellowPrimary ssm:leading-[48px] leading-[28px] py-2 px-10 ssm:px-20 text-center uppercase rounded-xl border-2 border-solid border-yellowPrimary">
                                <span className='relative z-10'>Đọc ngay</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-7">
                          <div className='relative h-[600px] w-full lg:block hidden'>
                            <Image itemProp='image' itemScope itemType='https://schema.org/ImageObject' fill sizes="(min-width: 808px) 100%, 100%" className='object-cover object-top rounded-2xl' src={item.thumbnail} alt={item.name} />
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
          ))}
        </div>
        <button onClick={scrollPrev} className="absolute top-1/2 left-2 hidden md:block md:left-10 text-white" type="button" aria-label='Previous'>
          <FaChevronLeft size={30} />
        </button>
        <button onClick={scrollNext} className="absolute top-1/2 right-2 hidden md:block md:right-10 text-white" type='button' aria-label='Next'>
          <FaChevronRight size={30} />
        </button>
      </div>
    )}
    </>
  )
}

export function TrendingCarousel({data}: {data: ComicProp[]}){
  const options : EmblaOptionsType = {
    loop: true,
    align: 'start',
  }
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()
  return(
    <div className='relative'>
      <div className='embla mr-0 sm:mr-[60px]' ref={emblaRef}>
        <div className='embla__container'>
        {data.map((item, index: number) => (
          <div className="embla__slide embla__slide__trending group" key={index}>
            <div className="relative flex cursor-pointer bg-gradient-3" title={item.name}>
              <div className="p-[10px] hidden sm:flex gap-[10px] w-[30px] text-mediumGray group-hover:text-white transition-all duration-500 items-center mr-[7px] rotate-180" style={{ writingMode: 'vertical-lr' }}>
                <span className="font-[1000] text-[28px] md:text-[35px]">{index + 1}</span>
                <div className="whitespace-nowrap text-[15px] overflow-hidden text-ellipsis md:text-[18px] leading-[1.4em] font-[500] h-[200px]">{item.name}</div>
              </div>
              <div className='absolute bg-white block sm:hidden top-0 left-0 px-2 py-1 z-10 font-bold text-xl text-center'>
                0{index + 1}
              </div>
              <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.slug}`} className="relative w-full block overflow-hidden text-white h-[250px] sm:h-[300px]">
                <Image src={item.thumbnail} alt={item.name} fill itemProp='image' className='group-hover:scale-110 transition-all duration-500' itemScope itemType='https://schema.org/ImageObject'
                  sizes="(min-width: 808px) 100vw, 100vw" 
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }} />
              </Link>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className='absolute top-0 py-[10px] mr-[10px] right-0 bottom-0 hidden sm:grid grid-rows-2 gap-3 w-[40px]'>
        <button onClick={scrollPrev} className="bg-btn hover:bg-btnHover rounded-md outline-none text-mediumGray hover:text-white" type="button" aria-label='Previous'>
          <FaChevronLeft size={30} className='ml-1' />
        </button>
        <button onClick={scrollNext} className="bg-btn hover:bg-btnHover rounded-md outline-none text-mediumGray hover:text-white" type="button" aria-label='Next'>
          <FaChevronRight size={30} className='ml-1' />
        </button>
      </div>
    </div>
  )
}

export function ScheduleSlide({data}: {data: any}){
  const [active, setActive] = useState(0);
  const options : EmblaOptionsType = {
    loop: true,
    align: 'start',
  }
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  useEffect(() => {
    if (data) {
      const today = new Date();
      const formattedToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
      
      const daysOfWeek = Object.keys(data);
      const index = daysOfWeek.findIndex(day => data[day].date === formattedToday);
      
      if (index !== -1) {
        setActive(index);
      }
    }
  }, [data])
  if(!data) return null
  const daysOfWeek = Object.keys(data);
  const activeDay = daysOfWeek[active];
  const activeComics = data[activeDay]?.comics || [];
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const handleClick = (index: number) => {
    setActive(index);
  }
  const renderSchedule = (weekSchedule: any) => {
    return Object.entries(weekSchedule).map(([day, { date }] : any, index: number) => (
      <div className={`embla__slide embla__slide__schedule cursor-pointer group ${index == active ? 'border-b-[5px]' : ''}`} key={day} onClick={() => handleClick(index)}>
        <div className='text-mediumGray uppercase text-center'>
          <p className='sm:text-[18px] text-[12px] leading-[20px] mb-[10px]'>{date}</p>
          <h2 className='text-[16px] sm:text-[30px] font-bold text-greyLight group-hover:text-white'>{day}</h2>
        </div>
      </div>
    ));
  };
  return(
    <>
    <div className="py-[30px] px-[70px] border-b border-[#000000] relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
        {renderSchedule(data)}
        </div>
      </div>
      <button onClick={scrollPrev} className="absolute -translate-y-1/2 top-1/2 left-2 md:left-10 text-white" type="button" aria-label='Previous'>
        <FaChevronLeft size={30} />
      </button>
      <button onClick={scrollNext} className="absolute -translate-y-1/2 top-1/2 right-2 md:right-10 text-white" type='button' aria-label='Next'>
        <FaChevronRight size={30} />
      </button>
    </div>
    <div className='py-[30px] px-0 bg-read bg-cover bg-center bg-no-repeat ssm:px-[30px]'>
      <div>
        {activeComics.length > 0 && activeComics.map((item: any, index: number) => (
        <div className='block mb-5' key={index}>
          <div className='flex items-center flex-wrap'>
            <div className="xl:w-1/12 lg:w-1/12 md:w-2/12 sm:w-2/12 w-0">
                <p className="text-[20px] text-greyLight font-pro-semi-bold">{new Date(item.release_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
            </div>
            <div className="xl:w-8/12 lg:w-8/12 md:w-7/12 sm:w-10/12 w-full">
              <div className="flex items-center">
                  <Link href={`/${item.comic.slug}`} className="xl:w-1/12 lg:w-2/12 md:w-2/12 sm:w-2/12 w-3/12 ps-0 pe-0 text-right">
                      <div className='relative w-auto h-[70px] sm:h-[90px] lg:h-[100px] max-w-[100%]'>
                        <Image src={item.comic.thumbnail} fill className="object-fill" alt="img" sizes="(min-width: 808px) 100vw, 100vw"  />
                      </div>
                  </Link>
                  <div className="xl:w-8/12 lg:w-8/12 md:w-7/12 sm:w-7/12 w-9/12">
                      <div className="h-[100px] table-cell pl-[10px] align-middle">
                          <Link href={`/${item.comic.slug}`} className="text-white line-clamp-1 text-ellipsis hover:text-[#d0e6a5] text-[22px] mb-[15px] font-primary">{item.comic.name}</Link>
                          {item.comic.categories && item.comic.categories.map((category: CategoryProp) => (
                            <Link key={category.id} href={`/the-loai/${category.slug}`} className="mr-1 hover:text-white hover:bg-btnHover hover:border-btnHover duration-300 inline-block px-3 border-[2px] border-solid rounded-md border-mediumGray text-mediumGray capitalize text-[16px] font-medium mb-[20px]">{category.name}</Link>
                          ))}
                      </div>
                  </div>
                  <div className="xl:w-3/12 lg:w-2/12 md:w-3/12 sm:w-3/12 w-0">
                      <p className="text-[20px] text-greyLight font-pro-semi-bold text-right">Manga</p>
                  </div>
              </div>
            </div>
            <div className="xl:w-3/12 lg:w-3/12 md:w-3/12 w-full text-right md:block hidden">
                <span className="text-[20px] text-greyLight font-pro-semi-bold">{item.volume}</span>
            </div>
          </div>
        </div>
        ))}
        {activeComics.length === 0 && (
          <div className='text-center text-white font-bold text-xl'>
            <p>Không có truyện nào được cập nhật vào ngày hôm nay</p>
            <p>Vui lòng quay lại sau</p>
          </div>)}
      </div>
    </div>
    </>
  )
}