import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Điều Khoản Dịch Vụ - ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

function Page() {
    return (  
        <>
        <Header />
        <main>
            <div className="container mx-auto">
                <section className="mb-10 py-12">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-white text-[2.5rem] font-medium leading-[1.2]">Điều khoản dịch vụ</h1>
                    </div>
                    <div className="block">
                        <article>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">1. Điều khoản</h4>
                            <p className="mb-4 text-[#8f96a0]">Bằng cách truy cập trang web này, có thể truy cập từ <a className="text-[#c6cacf] hover:text-white transition-all duration-300" href={process.env.NEXT_PUBLIC_BASE_URL}>{process.env.NEXT_PUBLIC_BASE_URL}</a>, bạn đồng ý bị ràng buộc bởi các Điều khoản và Điều kiện sử dụng của Trang web này và đồng ý rằng bạn chịu trách nhiệm về thỏa thuận với bất kỳ luật hiện hành nào của địa phương. Nếu bạn không đồng ý với bất kỳ điều khoản nào trong số này, bạn sẽ bị cấm truy cập trang web này.</p>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">2. Sửa đổi điều khoản sử dụng trang web</h4>
                            <p className="mb-4 text-[#8f96a0]">{process.env.NEXT_PUBLIC_APP_NAME} có thể sửa đổi các Điều khoản sử dụng này cho trang web của mình bất cứ lúc nào mà không cần thông báo trước. Bằng cách sử dụng trang web này, bạn đồng ý bị ràng buộc bởi phiên bản hiện tại của các Điều khoản và Điều kiện sử dụng này.</p>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">3. Luật quản lý</h4>
                            <p className="mb-4 text-[#8f96a0]">Bất kỳ khiếu nại nào liên quan đến {process.env.NEXT_PUBLIC_APP_NAME} sẽ được điều chỉnh bởi luật của BQ mà không liên quan đến xung đột của các quy định pháp luật.</p>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">4. Quyền riêng tư của bạn</h4>
                            <p className="mb-4 text-[#8f96a0]">Vui lòng đọc <a className="text-[#c6cacf] hover:text-white transition-all duration-300" href="/chinh-sach">chính sách bảo mật</a> của chúng tôi.</p>
                        </article>
                    </div>
                </section>
            </div>
        </main>
        <Footer />
        </>
    );
}

export default Page;