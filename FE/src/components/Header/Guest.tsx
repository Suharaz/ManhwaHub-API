/* eslint-disable @next/next/no-img-element */
"use client"
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";
import NavigationUser from "../Navigation/User";
import { IoGrid } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { renderStatus } from "@/utils/status";
import { ComicProp } from "@/types/ComicProp";
import { getAllCategories } from "@/services/categories";
import { usePathname } from "next/navigation";
import axiosClient from "@/libs/axiosClient";

interface SreachResult {
    slug: string;
    thumbnail: string;
    name: string;
    status: string;
    Chapters: {
        name: string;
    };
}

function Header({read = false, handle, active = false, page = 1, chapter, totalPage = 1, containerRef} : {read?: boolean, handle?: any, active?: boolean, page?: number, chapter?: string, totalPage?: number, containerRef?: any}) {
    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<any>(null);
    const debounceTimeout = useRef<any>(null);
    const [categories, setCategories] = useState([]);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        getAllCategories()
            .then(data => setCategories(data || []))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        if (read === true) {
            const mediaQuery = window.matchMedia('(max-width: 1280px)');
            let lastScrollTop = 0;
            const handleScroll = (e: any) => {
                const scrollTop = e.target.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > 300) {
                    setIsScrollingDown(true);
                } else {
                    setIsScrollingDown(false);
                }

                lastScrollTop = scrollTop;
            };

            const scrollContainer = containerRef.current;
            if (scrollContainer && mediaQuery.matches) {
                scrollContainer.addEventListener('scroll', handleScroll);
            }

            return () => {
                if (scrollContainer && mediaQuery.matches) {
                    scrollContainer.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, [read, containerRef]);

    useEffect(() => {
        document.body.classList.remove('overflow-hidden');
    }, [pathname]);

    const debounce = (func: Function, delay: number) => {
        return (...args: any) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const searchApi = (keyword: string) => {
        axiosClient.get(`/api/home/search?keyword=${keyword}`).then((res) => {
            // console.log(res.data.data.items);
            setSearchResult(res.data.data.items);
        }).catch(() => {
            setSearchResult(null);
        });
    };

    const debouncedSearch = debounce(searchApi, 400);

    const handleInputChange = (e: any) => {
        const keyword = e.target.value;
        setSearch(keyword);
        if(keyword.trim() !== '') {
            debouncedSearch(keyword);
        }else{
            setSearchResult(null);
        }
    }

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
        if(showSearch) {
            document.body.classList.remove('overflow-hidden');
        }else{
            document.body.classList.add('overflow-hidden');
        }
    }

    return (
        <header className={`z-[88] ${!read ? 'relative' : `sticky xl:fixed top-0 left-0 ${active ? 'right-[19rem]' : 'right-0'} bg-[#141d2c]`} ${isScrollingDown ? 'transform -translate-y-full -mt-[64px]' : 'transform translate-y-0 mt-0'} border-b border-b-[#1e2c43] transition-all duration-300`}>
            <div className={`mx-auto px-[10px] ${read ? '' : 'container'}`}>
                <div className="flex items-center h-[4rem]">
                    <button onClick={() => setShow(!show)} aria-label="listmobile" className="text-[#c6cacf] hover:text-white pr-2 sm:pr-4 xl:hidden block">
                        <BsList size={25} />
                    </button>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
                        className="mr-4 relative inline-block transition-all text-2xl font-bold text-white px-6 py-3 rounded-xl 
                                hover:scale-105 hover:rotate-2 transform duration-300 ease-in-out"
                        style={{
                            backgroundImage: "url('https://i.pinimg.com/originals/62/39/4d/62394d753859943e6a1a36443ef78795.gif')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {!read ? (
                            <span className="transition-all duration-300 ease-in-out drop-shadow-lg">Truyện Hihi🚀</span>
                        ) : (
                            <span className="transition-all duration-300 ease-in-out drop-shadow-lg">Hihi</span>
                        )}
                    </Link>


                    <div>
                        <ul className={`py-[.4rem] text-[#c6cacf] ${show ? 'block' : 'hidden'} xl:flex max-xl:absolute transition-all max-xl:left-4 max-xl:top-15 max-xl:shadow-10 max-xl:bg-[#182335] max-xl:boder max-xl:rounded-lg max-xl:border-[#1e2c43]`}>
                            <li className="relative group">
                                <span className="flex items-center py-2 px-[1.2rem] cursor-pointer text-[1.05rem] hover:text-white transition-all">Thể loại</span>
                                <ul className="xl:absolute xl:rounded-lg hidden group-open:block group-hover:block bg-[#141d2c] xl:bg-btn max-xl:max-w-[290px] z-10 top-full left-0 right-0 overflow-hidden p-[.8rem] w-full xl:w-[32rem] border-t-[#235479] border-b-[#235479] border-t border-b xl:border xl:border-btnHover">
                                    {categories.length > 0 && categories.map((category: any, index: number) => (
                                        <li key={index} className="float-left w-1/2 xl:w-1/3">
                                            <Link href={`/the-loai/${category.slug}`} className="block py-[.3rem] px-[.8rem] text-[#8f96a0] hover:text-white transition-all overflow-hidden text-ellipsis whitespace-nowrap">{category.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="relative">
                                <Link href={`/danh-sach/truyen-moi`} className="flex items-center py-2 px-[1.2rem] cursor-pointer text-[1.05rem] hover:text-white transition-all">Truyện mới</Link>
                            </li>
                            <li className="relative">
                                <Link href={`/danh-sach/truyen-moi-cap-nhat`} className="flex items-center py-2 px-[1.2rem] cursor-pointer text-[1.05rem] hover:text-white transition-all">Mới cập nhật</Link>
                            </li>
                            <li className="relative">
                                <Link href={`/danh-sach/truyen-hot`} className="flex items-center py-2 px-[1.2rem] cursor-pointer text-[1.05rem] hover:text-white transition-all">Truyện hot</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`flex-grow m-0 md:mx-4 max-md:fixed max-md:w-full max-md:left-0 max-md:top-0 max-md:p-4 max-md:bottom-0 z-3 ${showSearch ? 'max-md:opacity-100 mt-0 ' : 'max-md:opacity-0 -mt-20 md:mt-0 pointer-events-none md:pointer-events-auto '}duration-300 transition-all`}>
                        {showSearch && (
                            <div 
                                className="absolute top-0 left-0 w-screen h-screen z-[4] bg-overlay transition-all"
                                onClick={handleShowSearch}
                            />
                        )}
                        <div className="relative z-[5]">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                if (search.trim()) {
                                    window.location.href = `/tim-kiem-nang-cao/${search}`;
                                }
                            }} className="flex items-center z-[6] h-[2.6rem] relative bg-btn rounded-[50rem] pl-[.8rem] transition-all border border-mainSec" autoComplete="off">
                                <CiSearch className="text-white" size={22} />
                                <input 
                                    value={search} 
                                    onChange={handleInputChange} 
                                    type="text" 
                                    name="keyword" 
                                    className="flex-grow pl-1 text-white border-none focus:outline-none bg-transparent" 
                                    placeholder="Tìm kiếm truyện..." 
                                />
                                <button aria-label="Search" title="Search" className="flex-shrink-0 z-[100] inline-flex items-center h-[1.85rem] rounded-[50rem] mr-[.3rem] text-white bg-[#235479] hover:bg-[#2c6996] font-normal text-center text-[1rem] leading-[1.5] transition-all select-none py-[.475rem] px-3" type="submit">
                                    <MdOutlineSupervisedUserCircle />
                                    <span className="ml-[.2rem]">Tìm</span>
                                </button>
                            </form>
                            {searchResult && searchResult.length > 0 && (
                                <div className={`top-full absolute w-full bg-btn shadow-lg overflow-hidden pt-4 -mt-4 z-[5] rounded-e-lg border border-btnHover`}>
                                <div>
                                {searchResult?.map((item: SreachResult, index: number) => (
                                                <Link 
                                                    href={`/${item.slug}`} 
                                                    className={`${index % 2 === 0 ? 'bg-opacity11x' : ''} flex hover:bg-btnHover items-center relative p-4 w-full transition-all`} 
                                                    key={index}
                                                >
                                                    <div className="w-[3.2rem] mr-[.8rem] flex-shrink-0 rounded-[.3rem] overflow-hidden block">
                                                        <div className="relative pb-[140%]">
                                                            <img src={item.thumbnail} className="absolute w-full top-0 left-0" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow w-full">
                                                        <h6 className="w-full transition-all duration-300 font-medium line-clamp-1 text-ellipsis leading-[1.5rem] text-[#c6cacf] hover:text-white text-[1rem]">
                                                            {item.name}
                                                        </h6>
                                                        <div>
                                                           
                                                           
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}

                                </div>
                                <div className="p-4">
                                    <Link href={`/tim-kiem-nang-cao/${search}`} className="w-full text-white bg-[#3c8bc6] hover:bg-[#5a9dcf] inline-block font-normal text-center select-none py-[.475rem] px-3 text-[1rem] transition-all rounded-lg">
                                        <span>Xem tất cả kết quả</span>
                                    </Link>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    {read && <>
                        <div className="ml-4 max-sm:text-[.85rem] select-none text-mediumGray">
                            <span className="capitalize max-sm:text-center">
                                <span className="text-textSm">Chapter</span> <span className="font-medium">{chapter}</span>
                            </span>
                        </div>
                        <div className="ml-4 max-sm:text-[.85rem] select-none text-mediumGray">
                            <span className="capitalize">
                                <span className="text-textSm">Trang</span> <span className="font-medium">{page + 1}/{totalPage}</span>
                            </span>
                        </div>
                    </>}
                    <button onClick={handleShowSearch} aria-label="show search" className="md:hidden block ml-auto text-[#c6cacf] hover:text-white">
                        <FaSearch />
                    </button>
                    <NavigationUser show={showSearch} />
                    {read && <button onClick={handle} type="button" aria-label="Menu" className="ml-4 whitespace-nowrap text-white bg-[#3c8bc6] hover:bg-[#5a9dcf] inline-flex items-center font-normal text-center select-none py-[.45rem] px-3 text-[1rem] leading-[1.5] rounded-lg transition-all">
                        <IoGrid />
                        <span className="uppercase font-medium tracking-widest ml-1 max-xl:hidden">Menu</span>
                    </button>}
                </div>
            </div>
        </header>
    );
}

export default Header;
