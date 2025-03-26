"use client"
import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header/Guest";
import { getAuthToken } from "@/hooks/useAuth";
import axiosClient from "@/libs/axiosClient";

        function Pay({message, id}: {message: string, id: number}) {
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');

    const handleBuy = async () => {
        setMessageError('');
        const token = await getAuthToken();
        if(!token){
            setMessageError('Bạn cần đăng nhập để có thể mua chap.');
            return;
        }

        try {
            
            const res = await axiosClient.post('/api/user/buyChapter', {
                chapter_id: id
            });
            if(res.data.status === 'success'){
                setMessageSuccess(res.data.message);
                window.location.reload();
            }else{
                setMessageError(res.data.message);
            }
        } catch (error) {
            setMessageError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    }

    const handleClose = () => {
        setMessageError('');
        setMessageSuccess('');
    }

    return (
        <>
            <Header />
            <main className="container mx-auto">
                <div className="flex justify-center items-center min-h-[80vh] flex-col">
                    {messageError !== "" && <div className="mb-4 text-[#721c24] w-[500px] bg-[#f8d7da] relative py-3 px-5 rounded-lg">
                        <button onClick={handleClose} type="button" className="float-right text-[1.5rem] leading-none font-bold text-[#000] opacity-50">
                            <span>x</span>
                        </button>
                        <div>
                            {messageError}
                        </div>
                    </div>}
                    {messageSuccess !== "" && <div className="mb-4 text-[#155724] bg-[#d4edda] relative py-3 px-5 rounded-lg">
                        <button onClick={handleClose} type="button" className="float-right text-[1.5rem] leading-none font-bold text-[#000] opacity-50">
                            <span>x</span>
                        </button>
                        <div>
                            {messageSuccess}
                        </div>
                    </div>}
                    <h1 className="text-white font-bold text-2xl">{message}</h1>
                    <button onClick={handleBuy} className="bg-btn1 hover:bg-btn2 text-white transition-all duration-300 rounded-lg px-5 py-3 mt-5">Mua ngay</button>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Pay;