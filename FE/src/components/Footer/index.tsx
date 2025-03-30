"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Footer() {
    const [footer, setFooter] = useState<any>([]);
    // useEffect(() => {
    //     const getFooter = async () => {
    //         const res = await axios.get(`/baseapi/themes/getFooter`);
    //         setFooter(res.data.footer);
    //     }
    //     getFooter();
    // }, []);
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    return (  
        <footer className="bg-footer w-full bg-cover bg-no-repeat bg-[top_center]">
            <div className="py-[30px] text-[12px]" >
                <div className="max-w-[1800px] mx-auto overflow-hidden px-[10px]">
                    <div className="mb-[20px] pb-[20px] border-b border-b-whiteCustom3 inline-block"> 
                        </div>
                    <div className="mb-[10px]">
                        <div className="block mb-4 text-white">
                            <span className="inline-block pr-5 mr-5 border-r-whiteCustom1 border-r leading-[1em] text-[1.4em] font-bold">
                                DANH SÁCH A-Z
                            </span>
                            <span className="">
                            Tìm kiếm truyện theo bảng chữ cái từ A-Z.
                            </span>
                        </div>
                        <ul className="mt-[10px] text-white">
                            
                            <li className="inline-block mr-[10px] mb-[10px]">
                                <Link className="text-[14px] py-[4px] px-2 inline-block bg-whiteCustom4 hover:bg-yellowPrimary hover:text-black rounded" href={`/tim-kiem-nang-cao/0-9`}>0-9</Link>
                            </li>
                            {letters.map(letter => (
                            <li key={letter} className="inline-block mr-[10px] mb-[10px]">
                                <Link className="text-[14px] py-[4px] px-2 inline-block bg-whiteCustom4 hover:bg-yellowPrimary hover:text-black rounded" href={`/tim-kiem-nang-cao/${letter}`}>
                                    {letter}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-[10px] text-white">
                        <ul>
                            <li className="float-left mr-[40px]">
                                <Link className="text-[14px] leading-[30px] text-white hover:text-yellowPrimary" href={`/dieu-khoan-dich-vu`}>Điều khoản dịch vụ</Link>
                            </li>
                            <li className="float-left mr-[40px]">
                                <Link className="text-[14px] leading-[30px] text-white hover:text-yellowPrimary" href={`/chinh-sach`}>Chính sách</Link>
                            </li>
                            <li className="mr-[40px]">
                                <Link className="text-[14px] leading-[30px] text-white hover:text-yellowPrimary" href={`/lien-he`}>Liên hệ</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-[5px] leading-[1.4em] opacity-50 text-white">
                        {process.env.NEXT_PUBLIC_APP_NAME} không lưu trữ bất kỳ tệp nào trên máy chủ của chúng tôi, chúng tôi chỉ liên kết với phương tiện được lưu trữ trên các dịch vụ của bên thứ 3.
                    </div>
                    {footer && footer != '' && (
                        <div dangerouslySetInnerHTML={{ __html: footer }}></div>
                    )}
                    <p className="text-white opacity-50 mt-1">© {process.env.NEXT_PUBLIC_APP_NAME}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;