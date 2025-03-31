/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import useLocalStorage from "@/hooks/useLocalStorage";
import axiosClient from "@/libs/axiosClient";
import { UserProp } from "@/types/UserProp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck, FaKey,FaBitcoin } from "react-icons/fa";

function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [user, setUser] = useLocalStorage<UserProp | null>('user', null);
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const router = useRouter();
    const [data, setData] = useState<UserProp | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar);
            setData(user);
        }

        const fetchUser = async () => {
            try {
                const res = await axiosClient.get('/api/user/'+user?.id);
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setAvatar(res.data.user.avatar);
                setData(res.data.user);
                setUser(res.data.user);
            } catch (error) {
                if (!user) {
                    router.push('/');
                }
            }
        };
        
        fetchUser();
    }, []);

    const handleChangeInfo = (e: any) => {
        e.preventDefault();
        setMessageError('');
        setMessageSuccess('');
        if (isOpen && newPassword !== confirmPassword) {
            setMessageError('Mật khẩu xác nhận không khớp');
            return;
        }

        if(name === '' || email === '') {
            setMessageError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if(user != null && (name === user.name && email === user.email && file === null && !isOpen)) {
            setMessageError('Không có thay đổi nào được thực hiện');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if(isOpen && newPassword !== '') {
            formData.append('password', newPassword);
        }
        if(file) {
            formData.append('avatar', file);
        }

        axiosClient.put('/api/user/'+user?.id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setMessageSuccess(res.data.message);
                setUser(res.data.user);
                setNewPassword('');
                setConfirmPassword('');
                setFile(null);
            })
            .catch((err) => {
                setMessageError(err.response.data.message);
            });
    };

    const handleClose = () => {
        setMessageError('');
        setMessageSuccess('');
    }

    const handleChangeAvatar = (e: any) => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        if(file) {
            if (file.size > maxSize) {
                setMessageError('Kích thước file không được vượt quá 5MB');
                return;
            }
            setFile(file);
            setAvatar(URL.createObjectURL(file));
        }
    }
    return (  
        <div className="max-w-[500px]">
            <div className="flex justify-between mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center">Thông tin cá nhân</h2>
            </div>
            <form autoComplete="off" onSubmit={handleChangeInfo}>
                <div className="mb-4 flex flex-col items-center justify-center">
                    <img src={avatar} alt="avatar" className="w-[60px] h-[60px] rounded-full" />
                    <input onChange={handleChangeAvatar} type="file" className="hidden" id="avatar" accept="image/jpeg, image/png" />
                    <label htmlFor="avatar" className="mt-2 text-[#8f96a0] flex gap-1 cursor-pointer items-center hover:text-white transition-all duration-300">
                        <FaKey size={15} />
                        Đổi ảnh đại diện
                    </label>
                </div>
                {data && <div className="mb-4">
                    <div className="flex justify-between">
                        <span className="text-[13px]">{data.level ? data.level.name : '0'}</span>
                        <span className="text-[13px]">{data.nextLevel ? data.nextLevel.name : 'Tối đa'}</span>
                    </div>
                    <div className="w-full h-[15px] bg-btn rounded-[10px] overflow-hidden border border-btn2 mt-1">
                        <span className="level-progress-bar" style={{width: `${data.nextLevel ? data.exp / data.nextLevel.experience * 100 : '100'}%`}}>
                            {data.nextLevel ? data.exp / data.nextLevel.experience * 100 : '100'}%
                        </span>
                    </div>
                    <div className="mt-4 text-white"></div>
                    <div className="mt-0.5 text-white">Số dư</div>
                    <div className="flex items-center gap-1 text-white w-full text-[1rem] px-3 py-[.475rem] font-normal leading-[1.5] bg-[#141d2c] rounded-lg border border-[#1e2c43] transition-all duration-300 focus:outline-none focus:text-white focus:border-[#9fc6e3] focus:shadow-10">
                        <span>{data.total_point ? data.total_point : '0'}</span>
                        <FaBitcoin className="text-yellow-500" />
                    </div>
                    </div>}
                    
                {/* Withdraw Button and Modal - Outside the form */}
                {data && (
                    <div className="mb-4">
                        <button 
                            type="button"
                            onClick={() => setWithdrawModalOpen(true)}
                            className="w-full px-4 py-2 text-[1rem] leading-[1.5] rounded-lg bg-btn1 border text-white hover:bg-btn2 hover:border-btn2 border-btn1 transition-all duration-300"
                        >
                            Rút tiền
                        </button>
                    </div>
                )}

                {/* Withdraw Modal */}
                {withdrawModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-[#141d2c] p-6 rounded-lg w-[90%] max-w-[400px]">
                            <h3 className="text-white text-xl mb-4">Rút tiền</h3>
                            <input
                                type="number"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="Nhập số tiền muốn rút"
                                className="block text-white w-full text-[1rem] px-3 py-[.475rem] font-normal leading-[1.5] bg-[#1e2c43] rounded-lg border border-[#1e2c43] transition-all duration-300 focus:outline-none focus:text-white focus:border-[#9fc6e3] focus:shadow-10 mb-4"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setWithdrawModalOpen(false);
                                        setWithdrawAmount('');
                                    }}
                                    className="px-4 py-2 text-[1rem] leading-[1.5] rounded-lg border border-[#1e2c43] text-white hover:bg-[#1e2c43] transition-all duration-300"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!withdrawAmount || parseInt(withdrawAmount) <= 0) {
                                            setMessageError('Vui lòng nhập số tiền hợp lệ');
                                            return;
                                        }
                                        axiosClient.post('/api/user/withdrawRequest', { amount: parseInt(withdrawAmount) })
                                            .then((res) => {
                                                setMessageSuccess(res.data.message);
                                                setWithdrawModalOpen(false);
                                                setWithdrawAmount('');
                                            })
                                            .catch((err) => {
                                                setMessageError(err.response.data.error);
                                            });
                                    }}
                                    className="px-4 py-2 text-[1rem] leading-[1.5] rounded-lg bg-btn1 border text-white hover:bg-btn2 hover:border-btn2 border-btn1 transition-all duration-300"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {messageError !== "" && <div className="mb-4 text-[#721c24] bg-[#f8d7da] relative py-3 px-5 rounded-lg">
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

                <div className="mb-4">Username
                    <input type="text" placeholder="Nhập tên của bạn" value={name} onChange={(e) => setName(e.target.value)} className="block text-white w-full text-[1rem] px-3 py-[.475rem] font-normal leading-[1.5] bg-[#141d2c] rounded-lg border border-[#1e2c43] transition-all duration-300 focus:outline-none focus:text-white focus:border-[#9fc6e3] focus:shadow-10" />
                </div>
                <div className="mb-4">Email
                    <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} className="block text-white w-full text-[1rem] px-3 py-[.475rem] font-normal leading-[1.5] bg-[#141d2c] rounded-lg border border-[#1e2c43] transition-all duration-300 focus:outline-none focus:text-white focus:border-[#9fc6e3] focus:shadow-10" />
                </div>
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-[#8f96a0] flex gap-1 items-center hover:text-white transition-all duration-300">
                    <FaKey size={15} />
                    Đổi mật khẩu
                </button>
                <div className={`transition-[max-height] max-h-0 overflow-hidden duration-500 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="mt-3 mb-4">
                        <input type="text" placeholder="Nhập mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="block text-white w-full text-[1rem] px-3 py-[.475rem] font-normal leading-[1.5] bg-[#141d2c] rounded-lg border border-[#1e2c43] transition-all duration-300 focus:outline-none focus:text-white focus:border-[#9fc6e3] focus:shadow-10" />
                    </div>
                    <div className="mt-3">
                        <input type="text" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="block text-white w-full text-[1rem] px-3 py-[.475rem] font-normal leading-[1.5] bg-[#141d2c] rounded-lg border border-[#1e2c43] transition-all duration-300 focus:outline-none focus:text-white focus:border-[#9fc6e3] focus:shadow-10" />
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="w-full px-4 py-2 text-[1rem] leading-[1.5] rounded-lg bg-btn1 border justify-center text-white hover:bg-btn2 hover:border-btn2 border-btn1 flex gap-1 items-center text-center transition-all duration-300">
                        Lưu thay đổi
                        <FaCheck />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Page;
