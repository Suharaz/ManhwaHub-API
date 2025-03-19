import Footer from '@/components/Footer'
import Header from '@/components/Header/Guest'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <>
    <Header />
    <div className='h-[80vh] container flex justify-center items-center mx-auto'>
      <div className="text-center">
        <h1 className='text-white text-[6rem] font-[300] leading-[1.2]'>404</h1>
        <p className='text-[#c6cacf] block mb-2'>Không tìm thấy trang.</p>
        <Link href="/" className='bg-btn1 hover:bg-btn2 text-white font-normal px-3 text-[1rem] leading-[1.5] py-1 rounded-lg inline-block transition-all mt-2 duration-300'>Quay lại trang chủ</Link>
      </div>
    </div>
    <Footer />
    </>
  )
}