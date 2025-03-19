import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Liên Hệ - ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

function Page() {
    return (  
        <>
        <Header />
        <main>
            <div className="container mx-auto min-h-[70vh]">
                <section className="mb-10 py-12">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-white text-[2.5rem] font-medium leading-[1.2]">Liên hệ</h1>
                    </div>
                    <div className="block">
                        <article>
                            <h4 className="text-[#c6cacf] text-[1.5rem] font-medium leading-[1.2] mb-2">Liên hệ đặt quảng cáo</h4>
                            <p className="mb-4 text-[#8f96a0]">
                                Email: <a className="text-[#c6cacf] hover:text-white transition-all duration-30" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`}>{process.env.NEXT_PUBLIC_EMAIL_ADDRESS}</a>
                            </p>
                            <h5 className="mb-4 text-[#8f96a0]">
                                Telegram: <a className="text-[#c6cacf] hover:text-white transition-all duration-30" href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_USERNAME}`}>{process.env.NEXT_PUBLIC_TELEGRAM_USERNAME}</a>
                            </h5>
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