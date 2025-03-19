"use client"
import axiosClient from "@/libs/axiosClient";
import { useState } from "react";
import { CiStar } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu";
function ModalRating({id}: {id: number}) {
    const [showModal, setShowModal] = useState(false);
    const [selectedStar, setSelectedStar] = useState<number | null>(null);
    const [comment, setComment] = useState('');
    const handleShow = () => setShowModal(!showModal);
    const handleStarClick = (index: number) => {
        setSelectedStar(index);
    };

    const handleRating = async () => {
        if(comment === '' || selectedStar === null) {
            alert('Vui lòng chọn số sao và nhập nội dung!');
            return;
        }

        axiosClient.put(`/api/comics/${id}/rating`, {
            rating: selectedStar + 1,
            content: comment,
            id: id
        }).then((res) => {
            alert(res.data.message);
            setShowModal(false);
            setSelectedStar(null);
            setComment('');
        }).catch(() => {
            alert("Vui lòng đăng nhập để đánh giá!");
        });
    }
    return ( 
        <>
            <LuPencilLine className="cursor-pointer" onClick={handleShow} size={23} />
            {showModal ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="py-3 sm:max-w-xl sm:mx-auto">
                        <div className="bg-btn min-w-1xl flex flex-col rounded-xl shadow-lg">
                            <div className="px-12 py-5">
                                <h2 className="text-gray-800 text-3xl font-semibold text-center">Đánh giá của bạn với bộ truyện này!</h2>
                            </div>
                            <div className="bg-gray-200 w-full flex flex-col items-center">
                                <div className="flex flex-col items-center py-3 space-y-2">
                                    <span className="text-lg text-gray-800">Bạn cảm thấy bộ truyện này như nào?</span>
                                    <div className="flex space-x-3">
                                        {[...Array(5)].map((_, index) => (
                                            <CiStar
                                            key={index}
                                            size={30}
                                            color={selectedStar !== null && index <= selectedStar ? 'gold' : 'gray'}
                                            onClick={() => handleStarClick(index)}
                                            style={{ cursor: 'pointer' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-3/4 flex flex-col">
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="p-4 text-black rounded-xl focus:outline-none resize-none"></textarea>
                                <button onClick={handleRating} className="py-3 my-8 text-lg bg-btn1 hover:bg-btn2 rounded-xl text-white">Đánh Giá</button>
                                </div>
                            </div>
                            <div className="h-20 flex items-center justify-center">
                                <button onClick={handleShow} className="text-gray-600">Để sau</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default ModalRating;