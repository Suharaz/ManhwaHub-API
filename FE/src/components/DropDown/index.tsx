"use client"
import { getAuthToken } from "@/hooks/useAuth";
import useToast from "@/hooks/useToast";
import axiosClient from "@/libs/axiosClient";
import { useEffect, useState } from "react";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function DropDown({id, read = false, className = ""}: {id: number, read?: boolean, className?: string}) {
    const [login, setLogin] = useState<boolean>(false);
    const [follow, setFollow] = useState<boolean>(false);
    const {showToast} = useToast();
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if(token) {
                setLogin(true);
                const checkFollow = async () => {
                    await axiosClient.get("/api/user/checkAction/" + id).then((res) => {
                        if(res.data.follow) {
                            setFollow(true);
                        }
                    });
                }
                checkFollow();
            }
        };
        checkAuth();
    }, [id]);

    const handleFollow = async () => {
        if (!login) {
            showToast("Bạn cần đăng nhập để thực hiện chức năng này", { type: "error" });
            return;
        }
    
        try {
            if (follow) {
                // Nếu đã follow, gọi API hủy theo dõi
                await axiosClient.delete(`/api/comics/${id}/unfollow`);
                showToast("Đã hủy theo dõi truyện", { type: "success" });
                setFollow(false);
            } else {
                // Nếu chưa follow, gọi API follow
                await axiosClient.post(`/api/comics/${id}/follow`);
                showToast("Đã theo dõi truyện", { type: "success" });
                setFollow(true);
            }
        } catch (error) {
            showToast("Có lỗi xảy ra, vui lòng thử lại!", { type: "error" });
        }
    }

    return (  
        <>
        <ToastContainer transition={Zoom} />
        {!read ? (
            <button 
                onClick={handleFollow}
                className={`inline-flex text-[22px] font-medium transition-all text-center border-2 border-[#ff6b6b] py-1 px-2 rounded-md hover:before:bg-[#ff6b6b] relative shadow-2xl before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-[#ff6b6b] hover:before:left-0 hover:before:w-full ${className}`}
                aria-label="follow button"
            >
                <span className="relative z-10 flex gap-1 items-center">
                    <FaHeart size={30} />
                    {follow ? 'Hủy Theo Dõi' : 'Theo Dõi'}
                </span>
            </button>
        ) : (
            <button 
                onClick={handleFollow} 
                className={`mb-2 flex text-mediumGray items-center justify-between rounded-lg w-full py-[.6rem] px-6 bg-[#182335] hover:bg-[#1e2c43] hover:text-white leading-[1.9rem] whitespace-nowrap ${className}`}
            >
                <FaBookmark size={21} />
                <span>{follow ? 'Hủy Theo Dõi' : 'Theo Dõi'}</span>
            </button>
        )}
        </>
    );
}

export default DropDown;