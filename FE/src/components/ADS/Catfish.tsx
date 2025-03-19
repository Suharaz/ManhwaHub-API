"use client";

import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
function Catfish() {
    const [show, setShow] = useState(true);
    const [banners, setBanners] = useState([]);

    // useEffect(() => {
    //     const getADS = async () => {
    //         const res = await axios.get(`/baseapi/banners/getCatfish`);
    //         setBanners(res.data.data);
    //     }
    //     getADS();
    //     const savedState = sessionStorage.getItem('bannerState');
    //     if (savedState !== null) {
    //       setShow(JSON.parse(savedState));
    //     }
    // }, []);

    const handleClose = () => {
        setShow(false);
        sessionStorage.setItem('bannerState', 'false');
    };
    return (  
        <>
        {show && banners.length != 0 && (<div>
            <div style={{position:'fixed',zIndex:'1000', width: '100%', bottom: 0}}>
                <div style={{maxWidth:'700px', margin: '0 auto', position:'relative'}}>
                    <a onClick={handleClose} style={{top:'-25px',position:'absolute', right: 0, width:'25px',height:'25px',textAlign:'center', fontSize:'15px', opacity:'.7',}} className="cursor-pointer bg-btn1 hover:bg-btn2 text-white">X</a>
                    <div>
                        <div className="text-center">
                            {banners.map((banner: any, index) => (
                            <a key={index} className="ads-banner block" rel="nofollow" target="_blank" href={banner.url}>
                                <img alt="" className="ads-banner" src={banner.image} />
                            </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>)}
        </>
    );
}

export default Catfish;