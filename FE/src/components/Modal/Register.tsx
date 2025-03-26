"use client"
import axiosClient from "@/libs/axiosClient";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import ButtonLoading from "../Button/Loading";
import LoginGoogle from "../LoginGoogle";
function ModalRegister({ showModalRegister, setShowModalRegister, handleShow }: { showModalRegister: boolean, setShowModalRegister: any, handleShow: any }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<any>(null);
    const handleRegister = async (e: any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        
        if(!name || !email || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }
        setLoading(true);
        await axiosClient.post('/api/auth/register', {
            name,
            email,
            password
        }).then(res => {
        if (res.status === 201) {
                alert('Đăng ký thành công,hay quay lại trang đăng nhập để đăng nhập');
                setShowModalRegister(false);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
        }).catch(err => {
            alert(err.response.data.message);
        }).finally(() => {
            setLoading(false);
        });
    }
    return (  
        <>
        {showModalRegister && <div className="fixed flex inset-0 z-50 justify-center items-center min-h-screen">
            <div 
                className="absolute top-0 left-0 w-full h-full z-50 bg-overlay transition-all"
                onClick={setShowModalRegister}
            />
            <div className="bg-btn bg-no-repeat bg-[top_center] z-[51] pt-[30px] rounded-[20px] text-white relative flex flex-col w-full max-w-lg px-4 h-fit">
                <div>
                    <div className="py-[25px] relative block">
                        <h5 className="text-center font-semibold text-[1.25rem] leading-[1.5]">Tạo tài khoản để tham gia {process.env.NEXT_PUBLIC_APP_NAME}</h5>
                        <button onClick={setShowModalRegister} className="absolute -top-[15px] right-0 sm:-right-[30px] text-[#111] w-[30px] h-[30px] rounded-full bg-white z-3 text-center inline-block leading-[30px]">
                            <span>X</span>
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleRegister} className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" autoComplete="off">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Tên</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-[#111] border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="text-[#111] border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Mật khẩu</label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" placeholder="••••••••" className="border text-[#111] sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Xác nhận mật khẩu</label>
                                <input type="password" autoComplete="off" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="border text-[#111] sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            </div>
                            
                            {loading ? <ButtonLoading style="bg-btn1" /> : <button type="submit" className="w-full text-white font-bold bg-btn1 hover:bg-btn2 rounded-lg text-sm px-5 py-2.5 text-center">Đăng Ký</button>}
                           
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

export default ModalRegister;
