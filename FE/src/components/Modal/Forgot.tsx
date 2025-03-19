"use client"
import axiosClient from "@/libs/axiosClient";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ButtonLoading from "../Button/Loading";

function ModalForgot({ showModalForgot, setShowModalForgot, handleShow }: { showModalForgot: boolean, setShowModalForgot: any, handleShow: any }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<any>(null);
    const [message, setMessage] = useState<any>(null);
    const handleRegister = async (e: any) => {
        e.preventDefault();

        if (!recaptchaRef.current.getValue()) {
            alert('Vui lòng xác nhận bạn không phải là robot');
            return;
        }

        if(!email || email === '') {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        setLoading(true);
        setMessage(null);
        await axiosClient.post('/baseapi/auth/v1/forgot', {
            email,
        }).then(res => {
            if (res.data.status == "success") {
                setMessage({type: 'success', message: res.data.message});
                setEmail('');
            }
        }).catch(err => {
            setMessage({type: 'error', message: err.response.data.message});
        }).finally(() => {
            setLoading(false);
        });
    }
    return (  
        <>
        {showModalForgot && <div className="fixed flex inset-0 z-50 justify-center items-center min-h-screen">
            <div 
                className="absolute top-0 left-0 w-full h-full z-50 bg-overlay transition-all"
                onClick={setShowModalForgot}
            />
            <div className="bg-btn bg-no-repeat bg-[top_center] z-[51] pt-[30px] rounded-[20px] text-white relative flex flex-col w-full max-w-lg px-4 h-fit">
                <div>
                    <div className="py-[25px] relative block">
                        <h5 className="text-center font-semibold text-[1.25rem] leading-[1.5]">Quên mật khẩu</h5>
                        <button onClick={setShowModalForgot} className="absolute -top-[15px] right-0 sm:-right-[30px] text-[#111] w-[30px] h-[30px] rounded-full bg-white z-3 text-center inline-block leading-[30px]">
                            <span>X</span>
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleRegister} className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" autoComplete="off">
                            {message && <div className={`mb-4 ${message?.type === 'success' ? 'text-[#155724] bg-[#d4edda]' : 'text-[#721c24] bg-[#f8d7da]'} relative py-3 px-5 rounded-lg`}>
                                <div>
                                    {message?.message}
                                </div>
                            </div>}
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="text-[#111] border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                        
                            <div>
                                <ReCAPTCHA 
                                    ref={recaptchaRef}
                                    sitekey={`${process.env.NEXT_PUBLIC_SITE_KEY}`}
                                />
                            </div>
                            {loading ? <ButtonLoading style="bg-btn1" /> : <button type="submit" className="w-full text-white font-bold bg-btn1 hover:bg-btn2 rounded-lg text-sm px-5 py-2.5 text-center">Quên Mật Khẩu</button>}
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Bạn đã có tài khoản? <button type="button" onClick={handleShow} className="text-[#cae962] hover:underline">Đăng nhập ngay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>}
        </>
    );
}

export default ModalForgot;