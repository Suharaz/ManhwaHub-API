import { getAuthToken } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import ModalLogin from "../Modal/Login";
import ModalRegister from "../Modal/Register";
import Dropdown from "../DropDown/User";
import DropdownNo from "../DropDown/Notificaiton";
import ModalForgot from "../Modal/Forgot";

function NavigationUser({show}: {show: boolean}) {
    const [isAuthenticated, setIsAuthenticated] = useState<any>(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalForgot, setShowModalForgot] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            setIsAuthenticated(token);
        };
        checkAuth();
    }, []);

    const handleShowModal = () => {
        setShowModal(!showModal);

        if(showModalRegister) {
            setShowModalRegister(false);
        }

        if(showModalForgot) {
            setShowModalForgot(false);
        }

        if(showModal){
            document.body.classList.remove('overflow-hidden');
        }else{
            document.body.classList.add('overflow-hidden');
        }
    }

    const handleShowModalRegister = () => {
        setShowModalRegister(!showModalRegister);

        if(showModal) {
            setShowModal(false);
        }

        if(showModalRegister){
            document.body.classList.remove('overflow-hidden');
        }else{
            document.body.classList.add('overflow-hidden');
        }
    }

    const handleShowModalForgot = () => {
        setShowModalForgot(!showModalForgot);

        if(showModal) {
            setShowModal(false);
        }

        if(showModalForgot){
            document.body.classList.remove('overflow-hidden');
        }else{
            document.body.classList.add('overflow-hidden');
        }
    }

    return (  
        <div className={`flex ml-4 ${show ? '-z-1' : ''}`}>
            {isAuthenticated ? (
            <>
            <div className="relative">
                <DropdownNo />
            </div>
            <div className="relative">
                <Dropdown />
            </div>
            </>
            ) : (
                <button onClick={handleShowModal} aria-label="login" className="inline-flex items-center whitespace-nowrap font-normal text-white hover:text-white bg-[#3c8bc6] rounded-full hover:bg-[#5a9dcf] text-center select-none py-2 sm:py-[.45rem] px-2 sm:px-3 text-[1rem] leading-[1.5] transition-all">
                    <span className="px-1 hidden sm:block">Đăng Nhập</span>
                    <BsChevronRight strokeWidth={3} className="hidden sm:block" />
                    <FaUser className="block sm:hidden" />
                </button>
            )}
            <ModalLogin showModal={showModal} setShowModal={handleShowModal} handleShow={handleShowModalRegister} setShowModalForgot={handleShowModalForgot} />
            <ModalRegister showModalRegister={showModalRegister} setShowModalRegister={handleShowModalRegister} handleShow={handleShowModal} />
            <ModalForgot showModalForgot={showModalForgot} setShowModalForgot={handleShowModalForgot} handleShow={handleShowModal} />
        </div>
    );
}

export default NavigationUser;