'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header/Guest'
import { useEffect } from 'react'
 
export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    useEffect(() => {
        console.error(error)
    }, [error]);
  return (
    <>
    <Header />
    <div className='h-[80vh] container flex justify-center items-center mx-auto'>
      <div className="text-center">
        <h1 className='text-white text-[6rem] font-[300] leading-[1.2]'>501</h1>
        <p className='text-[#c6cacf] block mb-2'>Có lỗi xảy ra vui lòng bấm thử lại.</p>
        <button onClick={ () => reset()} className='bg-btn1 hover:bg-btn2 text-white font-normal px-3 text-[1rem] leading-[1.5] py-1 rounded-lg inline-block transition-all mt-2 duration-300'>Tải lại trang</button>
      </div>
    </div>
    <Footer />
    </>
  )
}