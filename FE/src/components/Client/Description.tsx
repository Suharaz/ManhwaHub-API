"use client"
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

function DescriptionComic({description}: {description: string}) {
    const [show, setShow] = useState(false);

    const handleShowModal = () => {
        setShow(!show);
        if(show){
            document.body.classList.remove('overflow-hidden');
        }else{
            document.body.classList.add('overflow-hidden');
        }
    }
    return (  
        <>
            <div className="line-clamp-3 text-ellipsis" dangerouslySetInnerHTML={{__html: description}} />
            <button onClick={handleShowModal} className="text-white border-b border-[#8bbadd] font-bold transition-all duration-300 hover:text-btn1">
                Xem thêm
                <FaPlus className="inline-block ml-2" />
            </button>
            {show && <div className="absolute top-0 left-0 w-full h-full z-50 bg-overlay transition-all"></div>}
            <div className={`${show ? 'flex' : 'hidden'} fixed w-screen inset-0 z-50 justify-center items-center h-screen`}>
                <div className="bg-btn max-w-[500px] mx-auto max-ssm:mx-5 p-4 relative flex border flex-col border-btnHover rounded-lg w-full">
                    <div className="relative flex w-full justify-between">
                        <h3 className="text-xl font-bold">Nội dung</h3>
                        <FaTimes className="cursor-pointer hover:text-white text-mediumGray transition-all duration-300" onClick={handleShowModal} size={25} />
                    </div>
                    <div className="mt-3 text-mediumGray max-h-[400px] overflow-auto" dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        </>
    );
}

export default DescriptionComic;