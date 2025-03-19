"use client"
import axiosClient from "@/libs/axiosClient";
import { useState } from "react";
import ButtonLoading from "../Button/Loading";
import useLocalStorage from "@/hooks/useLocalStorage";
import Cookies from 'js-cookie';

interface ModalLoginProps {
    showModal: boolean;
    setShowModal: any;
    handleShow: () => void;
    setShowModalForgot: any;
}

function ModalLogin({ showModal, setShowModal, handleShow, setShowModalForgot }: ModalLoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUser] = useLocalStorage('user', null);
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async (e: any) => {
        e.preventDefault();

        if(!email || !password) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        setLoading(true);
        
        await axiosClient.post('http://localhost:9999/api/auth/login', {
            email,
            password
        }).then(res => {
            console.log("Response data:", res.data);
            if (res.data.message === "Login successful") {
                setUser(res.data.user);
                Cookies.set('token', res.data.token, { expires: 7 });
                
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            alert(err.response?.data?.message || 'Lỗi đăng nhập. Vui lòng thử lại sau.');
            console.error('Login error:', err);
        }).finally(() => {
            setLoading(false);
        });
    }
    return (
        <>
        {showModal && <div className="fixed flex inset-0 z-50 justify-center items-center min-h-screen">
            <div 
                className="absolute top-0 left-0 w-full h-full z-50 bg-overlay transition-all"
                onClick={setShowModal}
            />
            <div className="bg-btn bg-no-repeat bg-[top_center] z-[51] pt-[30px] rounded-[20px] text-white relative flex flex-col w-full max-w-lg px-4 h-fit">
                <div>
                    <div className="py-[25px] relative block">
                        <h5 className="text-center font-semibold text-[1.25rem] leading-[1.5]">Chào mừng bạn đến với {process.env.NEXT_PUBLIC_APP_NAME}</h5>
                        <button onClick={setShowModal} className="absolute -top-[15px] right-0 sm:-right-[30px] text-[#111] w-[30px] h-[30px] rounded-full bg-white z-3 text-center inline-block leading-[30px]">
                            <span>X</span>
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleLogin} className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" autoComplete="off">
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="text-[#111] border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Mật khẩu</label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" placeholder="••••••••" className="border text-[#111] sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                            <div className="text-sm font-medium w-full flex justify-end">
                                <button type="button" onClick={setShowModalForgot} className="text-[#cae962] hover:underline text-right">
                                    Quên Mật Khẩu ?
                                </button>
                            </div>
                            {loading ? <ButtonLoading style="bg-btn1" /> : <button type="submit" className="w-full text-white font-bold bg-btn1 hover:bg-btn2 rounded-lg text-sm px-5 py-2.5 text-center">Đăng Nhập</button>}
                           
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Bạn chưa có tài khoản? <button type="button" onClick={handleShow} className="text-[#cae962] hover:underline">Đăng ký ngay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> }
        </>
    );
}

export default ModalLogin;