/* eslint-disable @next/next/no-img-element */
"use client"
import { getAuthToken } from "@/hooks/useAuth";
import axiosClient from "@/libs/axiosClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

function GetHistory({id, slug, chapter}: {id: number, slug: string, chapter: string}) {
    const [slugChapter, setSlugChapter] = useState<string>(chapter);
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if(token) {
                const getHistory = async () => {
                    axiosClient.get("/baseapi/users/getHistory/" + id).then((res) => {
                        if(res.data.status == "success"){
                            setSlugChapter(res.data.continue);
                        }
                    });
                }
                getHistory();
            }
        }
        checkAuth();
    }, [id]);
    return (  
        <Link href={`/${slug}/${slugChapter}`} className="text-[22px] font-medium transition-all text-center border-2 border-mediumGray py-1 px-2 rounded-md hover:before:bg-mediumGray relative shadow-2xl  before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-[#111111] hover:shadow-mediumGray hover:before:left-0 hover:before:w-full">
            <span className="relative flex items-center gap-1 z-10">
                <FaPlay />
                Đọc tiếp
            </span>
        </Link>
    );
}

export default GetHistory;

export function SaveHistory({id, chapter, type}: {id: number, chapter: number, type: string}) {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if(token) {
                const saveHistory = async () => {
                    await axiosClient.get("/baseapi/users/saveHistory/" + id + "/" + chapter + "/" + type);
                }
                saveHistory();
            }else{
                const existingHistory = JSON.parse(localStorage.getItem("history") || "[]");
                const newEntry = { id, chapter, type };
                const storyIndex = existingHistory.findIndex((entry: { id: number }) => entry.id === id);

                if (storyIndex !== -1) {
                    existingHistory[storyIndex].chapter = chapter;
                } else {
                    existingHistory.push(newEntry);
                    if (existingHistory.length > 10) {
                        existingHistory.shift();
                    }
                }
                localStorage.setItem("history", JSON.stringify(existingHistory));
            }
        }
        checkAuth();
    }, [id, chapter, type]);
    return null;
}

export const ListHistories = () => {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if(token) {
                const getHistory = async () => {
                    axiosClient.get("/baseapi/users/getHistory/Home").then((res) => {
                        if(res.data.status == "success"){
                            setData(res.data.histories);
                        }
                    });
                }
                getHistory();
            }else{
                const getHistoryLocal = async () => {
                    const existingHistory = JSON.parse(localStorage.getItem("history") || "[]");
                    axiosClient.post("/baseapi/users/getHistory/Local", {history: existingHistory}).then((res) => {
                        if(res.data.status == "success"){
                            setData(res.data.histories);
                        }
                    });
                }
                getHistoryLocal();
            }
        }
        checkAuth();
    }, []);
    return (
        <>
        {data && data.length > 0 && (
        <>
        <div className="mb-2 text-center sm:text-left">
            <h2 className="text-[30px] w-full justify-center sm:justify-between flex-col sm:flex-row inline-flex items-center font-[900] font-pro-bold text-white uppercase">
                Lịch Sử Đọc
            </h2>
        </div>
        <div className="bg-mainSec w-full p-[15px] inline-block relative mb-5">
            <ul className="flex flex-col gap-2">
                {data.map((item: any, index: number) => (
                <li key={index}> 
                    <Link href={`/read/${item.comic.slug}`} className="w-[70px] mr-[10px] h-[70px] relative float-left overflow-hidden block"> 
                        <Image src={item.comic.thumbnail} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover hover:scale-105 transition-all duration-300 rounded-md" alt={item.comic.name} />
                    </Link> 
                    <h3 className="line-clamp-1 text-ellipsis mb-[5px] font-medium text-[16px] leading-[1.4em]"> 
                        <Link href={`/read/${item.comic.slug}`} className="text-white hover:text-[#d0e6a5]">{item.comic.name}</Link> 
                    </h3>
                    {item.continue && <p className="text-[#ccc] text-[14px] hover:text-[#d0e6a5]">
                        <Link href={`/read/${item.comic.slug}/vn/${item.continue.slug}`}>
                            Đọc tiếp chapter {item.continue.name}
                        </Link>
                    </p>}
                </li>
                ))}
            </ul>
        </div>
        </>
        )}
        </>
    )
}