"use client"

import { useEffect, useState } from "react";
import { FiChevronsUp } from "react-icons/fi";

function ButtonScroll() {
    const [show, setShow] = useState(false);
    const handleToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    }, []);
    return ( 
        <button aria-label="top" onClick={handleToTop} className={`fixed ${!show ? 'opacity-0' : 'opacity-100'} animate-bounce right-10 bottom-10 transition-all bg-yellowPrimary w-[50px] h-[50px] flex items-center justify-center text-black rounded-full z-999999`}>
            <FiChevronsUp size={25} />
        </button>
    );
}

export default ButtonScroll;