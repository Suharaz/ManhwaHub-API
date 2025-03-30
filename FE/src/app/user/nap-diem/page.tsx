/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import axiosClient from "@/libs/axiosClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { renderMoney } from "@/utils/index";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
    const [data, setData] = useState<any>(null);
    const [amount, setAmount] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();
    
 

    const handleBuy = () => {
        alert('Liên hệ admin để tiến hành nạp diểm');
    }

    const handleSubmitDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const amountValue = parseInt(amount);
        
        if (isNaN(amountValue) || amountValue < 5000) {
            toast.error('Số tiền nạp tối thiểu là 5,000 VND');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const response = await axiosClient.post('/api/user/depositRequest', {
                amount: amountValue
            });
            
            toast.success(response.data.message || 'Yêu cầu nạp tiền thành công!');
            setAmount('');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi gửi yêu cầu');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (  
        <div className="mb-10">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex justify-between mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center">Bảng giá</h2>
            </div>
            
            {/* Form nạp điểm */}
            <div className="bg-btn border border-btnHover rounded-lg p-6 mb-6">
                <h3 className="text-white text-xl mb-4">Nạp tiền theo số tiền tùy chọn</h3>
                <form onSubmit={handleSubmitDeposit}>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-[#3c8bc6] mb-2">Số tiền muốn nạp (VND)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-[#1a2539] border border-[#263855] rounded-md p-3 text-white"
                            placeholder="Nhập số tiền muốn nạp"
                        />
                        <p className="text-[#3c8bc6] mt-2 text-sm">* Số tiền nạp tối thiểu là 5,000 VND</p>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#3c8bc6] hover:bg-[#2d6a9a] text-white py-2 px-4 rounded-md disabled:opacity-50"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu nạp tiền'}
                    </button>
                </form>
            </div>
            
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data && data.length > 0 && data.map((item: any, index: number) => (
                    <div onClick={handleBuy} key={index} className="p-2 flex cursor-pointer">
                        <div className="p-4 h-40 relative overflow-hidden flex bg-btn hover:bg-[#1a2539] hover:border-[#263855] border border-btnHover rounded-lg transition-all duration-300 flex-grow w-full">
                            <div className="pl-4 flex-grow w-[1px] transition-all duration-300">
                                <div className="mt-[.3rem] flex justify-center items-center mb-[.6rem]">
                                    <span className="text-[.9rem] text-[#3c8bc6]">{item.name}</span>
                                </div>
                                <h4 className="text-white text-center overflow-hidden text-ellipsis whitespace-nowrap block text-[2rem] transition-all duration-300">
                                    {renderMoney(item.price)}
                                </h4>
                                <p className="mt-[.4rem] text-center text-[1.5rem] text-[#3c8bc6] transition-all duration-300">
                                    Nhận được {item.number_of_coins} điểm
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;