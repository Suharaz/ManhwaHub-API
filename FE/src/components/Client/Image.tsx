/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { ReadProp } from "@/types/ComicProp";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronRight, FaRegCommentDots, FaRegWindowMaximize } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong, FaEarthAmericas } from "react-icons/fa6";
import { Collapse, useDisclosure } from '@chakra-ui/react'
import axiosClient from "@/libs/axiosClient";
import Navigation from "../Navigation";
import { useRouter } from "next-nprogress-bar";
import { PiWarningCircle } from "react-icons/pi";
import { MdAutoAwesomeMosaic, MdOutlineRestorePage } from "react-icons/md";
import useLocalStorage from "@/hooks/useLocalStorage";
import Header from "../Header/Guest";
import DropDown from "../DropDown";
import ButtonReport from "../Button/Report";
import ReadDynamic from "../Dynamic/Read";
import { TbSquareChevronsUp } from "react-icons/tb";
import lozad from 'lozad'

export default function ImageComic({data}: {data: ReadProp}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [readingDirection, setReadingDirection] = useState('vertical');
    const [readingDirection1, setReadingDirection1] = useLocalStorage('readingDirection','vertical');
    const observerRef = useRef<any>(null);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentServer, setCurrentServer] = useState(data.currentChapter.server_name);
    const content = JSON.parse(data.currentChapter.content);
    const [images, setImages] = useState<string[]>(content);
    const { isOpen, onToggle } = useDisclosure();
    const [isOpenPage, setIsOpenPage] = useState(false);
    const [isOpenChapter, setIsOpenChapter] = useState(false);
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [currentSpeedIndex, setCurrentSpeedIndex] = useState(3);
    const speeds = [1000, 2000, 5000, null];
    const [intervalId, setIntervalId] = useState<any>(null);
    const router = useRouter();
    const scrollContainerRef = useRef<any>(null);

    const updatePageRefs = useCallback((el: HTMLDivElement | null, index: number) => {
        if (el) {
            pageRefs.current[index] = el;
            observerRef.current?.observe(el);
        }
    }, []);
    
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = pageRefs.current.indexOf(entry.target as HTMLDivElement);
                        if (index !== -1) {
                            setCurrentPage(index);
                        }
                    }
                });
            },
            { threshold: [0.1, 0.5, 1.0] }
        );

        pageRefs.current.forEach((element) => {
            if (observerRef.current && element) observerRef.current.observe(element);
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [images]);

    useEffect(() => {
        setReadingDirection(readingDirection1);
        const observer = lozad();
        observer.observe();
    }, []);

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);
    
    const handlePageClick = (index: number) => {
        const page = pageRefs.current[index];
        if (page) {
          page.scrollIntoView({ behavior: 'smooth' });
          setCurrentPage(index);
        }
    };
    
    const handleDirectionChange = () => {
        setReadingDirection(readingDirection === 'vertical' ? 'horizontal' : 'vertical');
        setReadingDirection1(readingDirection === 'vertical' ? 'horizontal' : 'vertical');
    };

    const handleNextPage = () => {
        if (currentPage < images.length - 1) {
          handlePageClick(currentPage + 1);
        }else{
            handleNextChapter();
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
          handlePageClick(currentPage - 1);
        }else{
            handlePrevChapter();
        }
    }

    const handleNextChapter = () => {
        if (data.nextChapter) {
            router.push(`/${data.comic.slug}/${data.nextChapter.slug}`);
        }
    }

    const handlePrevChapter = () => {
        if (data.prevChapter) {
            router.push(`/${data.comic.slug}/${data.prevChapter.slug}`);
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
          handleNextPage();
        } else if (event.key === 'ArrowLeft') {
          handlePrevPage();
        }
    };
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPage]);

    const handleChangeServer = (id: number) => {
        axiosClient.post('/baseapi/comics/changeServer', {
            id
        }).then(res => {
            const contentJson = JSON.parse(res.data.chapter.content);
            setImages(contentJson);
            setCurrentServer(res.data.chapter.server_name);

            setTimeout(() => {
                const images = document.querySelectorAll('.lozad');
                images.forEach(img => {
                    img.removeAttribute('data-loaded');
                    img.removeAttribute('src');
                });
                
                const observer = lozad();
                observer.observe();
            }, 100);
        });
    }

    const handleClickContainer = (e: any) => {
        if(readingDirection === 'horizontal') {
            const clickPosition = e.clientX;
            const width = e.currentTarget.offsetWidth;
    
            if (clickPosition < width / 2) {
                handlePrevPage();
            } else {
                handleNextPage();
            }
        };
    }

    const handleOpenPage = () => {
        setIsOpenPage(!isOpenPage);
        setIsOpenChapter(false);
        setIsOpenComment(false);
    }

    const handleOpenChapter = () => {
        setIsOpenChapter(!isOpenChapter);
        setIsOpenPage(false);
        setIsOpenComment(false);
    }

    const handleOpenComment = () => {
        setIsOpenComment(!isOpenComment);
        setIsOpenPage(false);
        setIsOpenChapter(false);
    }

    const handleOpenSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
        setIsOpenPage(false);
        setIsOpenChapter(false);
        setIsOpenComment(false);
    }

    const handleSpeedChange = () => {
        const nextSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
        setCurrentSpeedIndex(nextSpeedIndex);

        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

    const nextSpeed = speeds[nextSpeedIndex];
        if (nextSpeed !== null) {
            const id = setInterval(() => {
                setCurrentPage((prev) => {
                    const newPage = prev + 1;
                    if (newPage < images.length - 1) {
                        handlePageClick(newPage);
                    }else{
                        setIntervalId(null);
                    }
                    return newPage;
                });
            }, nextSpeed);
            setIntervalId(id);
        }
    };

    const handleGoToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const speedLabels = ['1s', '2s', '5s', 'Tắt'];
    const currentSpeedLabel = speedLabels[currentSpeedIndex];

    const breadCrumb = [
        {title: "Trang Chủ", link: process.env.NEXT_PUBLIC_BASE_URL + "/"},
        {title: data.comic.name, link: `${process.env.NEXT_PUBLIC_BASE_URL}/${data.comic.slug}`},
        {title: "Chap " + data.currentChapter.chapter_number, link: `${process.env.NEXT_PUBLIC_BASE_URL}/${data.comic.slug}/${data.currentChapter.slug}`}
    ]
    return (
        <>
        <Header read={true} handle={handleOpenSidebar} active={isOpenSidebar} containerRef={scrollContainerRef} page={currentPage} totalPage={images.length} chapter={data.currentChapter.name} />
        <main className={`flex w-full overflow-hidden relative flex-grow transition-all duration-300`}>
            <div className="w-[1px] xl:pt-[4.5rem] flex-grow relative transition-all duration-300 h-screen">
                <div ref={scrollContainerRef} onClick={handleClickContainer} className={`w-full h-full overflow-auto ${readingDirection === 'horizontal' ? 'flex items-center justify-center' : 'block'}`}>
                    {data.banners && data.banners.length > 0 && <div className="flex justify-center mt-5 mb-7">
                        {data.banners.map((item: any, index: number) => (
                        <a target="_blank" href={item.url} className="" key={index}>
                            <img src={item.image} alt="qc" />
                        </a>
                        ))}
                    </div>}
                    {data.ads1 && <div className="flex justify-center">
                    <a target="_blank" href={data.ads1.url} className="mt-5 mb-7">
                        <img src={data.ads1.image} alt="qc" />
                    </a>
                    </div>}
                    <div className={`${readingDirection === 'horizontal' ? 'w-auto' : 'w-full'} block`}>
                    {images.map((item, index: number) => (
                        <div className={`mx-auto ${readingDirection === 'horizontal' ? 'flex-shrink-1 flex-grow h-full' : ''} w-full select-none`} key={index}>
                            <div className={`relative block min-w-[50px] min-h-[90px] w-full text-center bg-loading bg-center bg-contain bg-no-repeat pointer-events-none ${readingDirection === 'horizontal' ? (currentPage == index ? 'block' : 'hidden') : ''}`}
                                ref={(el: HTMLDivElement) => updatePageRefs(el, index)} style={{backgroundSize:'60px 80px'}}>
                                <img
                                    className="lozad mx-auto transition-all max-w-full relative"
                                    data-src={item}
                                    alt=""
                                    src=""
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '';
                                    }}
                                    onLoad={(e) => {
                                        e.currentTarget.alt = `Page ${index + 1}`;
                                    }}
                                />

                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="flex flex-col items-center my-8 pb-12">
                        {data.prevChapter && <Link href={`/${data.comic.slug}/${data.prevChapter.slug}`} className="flex items-center gap-2 py-[.6rem] px-4 rounded-md text-white capitalize transition-all">
                            <FaArrowLeftLong />
                            Chap trước
                        </Link>}
                        {data.nextChapter && <Link href={`/${data.comic.slug}/${data.nextChapter.slug}`} className="flex bg-[#3c8bc6] hover:bg-[#235479] mt-2 items-center gap-2 py-[.6rem] px-4 rounded-md text-white capitalize transition-all">
                            Chap sau
                            <FaArrowRightLong />
                        </Link>}
                    </div>
                    {data.ads2 && <div className="flex justify-center">
                    <a target="_blank" href={data.ads2.url} className="mt-5 mb-7">
                        <img src={data.ads2.image} alt="qc" />
                    </a>
                    </div>}
                </div>
                <div className="fixed bottom-0 right-0 left-0 z-[2] h-[1.4rem] items-end flex transition-all">
                    <div className="flex items-center h-[.3rem] w-full shadow-xl transition-width">
                        <ul className="flex flex-grow h-full">
                            {images.map((_, index: number) => (
                            <li
                                key={index}
                                onClick={() => handlePageClick(index)}
                                className={`cursor-pointer relative flex-grow ${
                                currentPage === index ? 'bg-[#3c8bc6]' : 'bg-[#182335] ml-[.1rem]'
                                }`}
                            >
                                <div className="bottom-full mb-[.2rem] left-1/2 -translate-x-1/2 absolute block bg-[#3c8bc6] text-white h-[1.6rem] rounded-[.5rem] opacity-0 transition-opacity leading-[1rem] whitespace-nowrap px-[.5rem] py-[.3rem]">{index + 1}</div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ReadDynamic data={data} images={images} isOpenPage={isOpenPage} setIsOpenPage={setIsOpenPage} isOpenChapter={isOpenChapter} setIsOpenChapter={setIsOpenChapter} isOpenComment={isOpenComment} setIsOpenComment={setIsOpenComment} currentPage={currentPage} handlePageClick={handlePageClick} />
            </div>
            <div className={`bg-[#0e1726] fixed top-0 right-0 bottom-0 ${isOpenSidebar ? 'mr-0' : '-mr-[19rem]'} w-[19rem] xl:relative flex flex-col transition-[margin] duration-300 overflow-y-auto overflow-x-visible flex-shrink-0 z-[150] p-[1.5rem]`}>
                <div className="flex justify-between mb-2">
                    <Link className="text-white text-[1.1rem] font-medium pr-[.3rem] line-clamp-2 text-ellipsis leading-[1.4rem]" href={`/${data.comic.slug}`}>
                        {data.comic.name}
                    </Link>
                    <div onClick={handleOpenSidebar} className="w-[2rem] cursor-pointer h-[2rem] flex justify-center items-center flex-shrink-0 text-white bg-btn hover:bg-btnHover font-normal text-center select-none text-[1rem] leading-[1.5] rounded-[.5rem] transition-all" aria-label="Close">
                        <FaChevronRight />
                    </div>
                </div>
                <div className="relative mb-2">
                    <button onClick={onToggle} className="flex items-center rounded-[.5rem] py-[.6rem] px-[1.5rem] bg-[#182335] hover:bg-[#1e2c43] hover:text-white transition-all text-[#8f96a0] leading-[1.9rem] whitespace-nowrap w-full justify-center" aria-label="dropdown"> 
                        <FaEarthAmericas />
                        <span className="mx-1">Máy Chủ: </span> 
                        <b className="text-white font-normal">{currentServer}</b> 
                    </button>
                    <Collapse in={isOpen} animateOpacity>
                    <div className={`max-h-[250px] overflow-auto shadow-lg w-full left-auto right-0 absolute top-full float-left z-999 min-w-[10rem] py-2 my-[.125rem] text-[1rem] text-mediumGray text-left bg-[#182335] rounded-lg`}>
                        {data.servers.map((item: any, index: number) => (
                            <button onClick={() => handleChangeServer(item.id)} className={`overflow-hidden whitespace-nowrap text-ellipsis block w-full py-1 px-6 clear-both font-normal hover:bg-[#1e2c43] hover:text-white transition-all ${currentServer == item.server_name ? 'text-[#3c8bc6] bg-[#1e2c43]' : ''}`} key={index}>
                                {item.server_name}
                            </button>
                        ))}
                    </div>
                    </Collapse>
                </div>
                <Navigation handlePrev={handlePrevPage} handleNext={handleNextPage} active={isOpenPage} setActive={handleOpenPage} title={`Trang ${currentPage + 1}`} />
                <Navigation handlePrev={handlePrevChapter} handleNext={handleNextChapter} active={isOpenChapter} setActive={handleOpenChapter} title={`Chapter ${data.currentChapter.name}`} />
                <button onClick={handleOpenComment} className="mb-2 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap">
                    <FaRegCommentDots size={25} />
                    <span>Bình Luận Chapter {data.currentChapter.name}</span>
                </button>
                <DropDown id={data.comic.id} read={true} />
                <Link href={`/${data.comic.slug}`} className="mb-2 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap">
                    <PiWarningCircle size={23} />
                    <span>Chi Tiết Truyện</span>
                </Link>
                <ButtonReport name={data.comic.name} chapter={`Chapter ${data.currentChapter.name}`} id={data.currentChapter.id} />
                <button onClick={handleDirectionChange} className="mb-2 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap">
                    <span>{readingDirection === 'horizontal' ? 'Đọc theo chiều ngang' : 'Đọc theo chiều dọc'}</span>
                    {readingDirection === 'horizontal' ? <MdOutlineRestorePage size={25} /> : <FaRegWindowMaximize />}
                </button>
                <button onClick={handleSpeedChange} className="mb-2 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap">
                    <span>Tự động cuộn: {currentSpeedLabel}</span>
                    <MdAutoAwesomeMosaic size={25} />
                </button>
                <button onClick={handleGoToTop} className="mb-2 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap">
                    <span>Lên đầu trang</span>
                    <TbSquareChevronsUp size={25} />
                </button>
            </div>
        </main>
        </>
    );
}