import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Chính Sách - ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

function Page() {
    return (  
        <>
        <Header />
        <main>
            <div className="container mx-auto min-h-[70vh]">
                <section className="mb-10 py-12">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-white text-[2.5rem] font-medium leading-[1.2]">Chính sách</h1>
                    </div>
                    <div className="block">
                        <article>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">Quyền riêng tư của bạn rất quan trọng với chúng tôi.</h4>
                            <p className="mb-4 text-[#8f96a0]">Chính sách của {process.env.NEXT_PUBLIC_APP_NAME} là tôn trọng quyền riêng tư của bạn liên quan đến bất kỳ thông tin nào mà chúng tôi có thể thu thập khi vận hành trang web của mình. Theo đó, chúng tôi đã phát triển chính sách bảo mật này để bạn hiểu cách chúng tôi thu thập, sử dụng, giao tiếp, tiết lộ và nói cách khác là sử dụng thông tin cá nhân. Chúng tôi đã phác thảo chính sách bảo mật của chúng tôi bên dưới.</p>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">Chính sách:</h4>
                            <ul className="list-disc text-[#8f96a0] pl-10">
                                <li>Chúng tôi sẽ thu thập thông tin cá nhân bằng các phương tiện hợp pháp và công bằng và khi thích hợp, với sự hiểu biết hoặc sự đồng ý của cá nhân có liên quan.</li>
                                <li>Trước hoặc tại thời điểm thu thập thông tin cá nhân, chúng tôi sẽ xác định các mục đích mà thông tin đang được thu thập.</li>
                                <li>Chúng tôi sẽ thu thập và sử dụng thông tin cá nhân chỉ để thực hiện những mục đích do chúng tôi chỉ định và cho các mục đích phụ trợ khác, trừ khi chúng tôi được sự đồng ý của cá nhân có liên quan hoặc theo yêu cầu của pháp luật.</li>
                                <li>Dữ liệu cá nhân phải phù hợp với các mục đích được sử dụng và trong phạm vi cần thiết cho các mục đích đó, phải chính xác, đầy đủ và cập nhật.</li>
                                <li>Chúng tôi sẽ bảo vệ thông tin cá nhân bằng cách sử dụng các biện pháp bảo mật hợp lý chống mất mát hoặc trộm cắp, cũng như truy cập trái phép, tiết lộ, sao chép, sử dụng hoặc sửa đổi.</li>
                                <li>Chúng tôi sẽ cung cấp cho khách hàng thông tin về các chính sách và thông lệ của chúng tôi liên quan đến việc quản lý thông tin cá nhân.</li>
                            </ul>
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