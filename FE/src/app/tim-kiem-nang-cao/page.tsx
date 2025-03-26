/* eslint-disable @next/next/no-img-element */
import FilterComic from "@/components/Client/Filter";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import { getAllCategories } from "@/services/categories";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: `Tìm Truyện Nâng Cao - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `Đọc truyện tranh đầy đủ và sớm nhất tại ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

async function Page() {
    // const data = await getAllCategories();
    return (  
        <div>
            <Header />
            <main className="bg-gradient-5 pb-28 flex-grow relative block">
                <div className="container mx-auto overflow-hidden min-h-screen">
                   
                    <section className="mt-12 mb-10">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-[1.3rem] sm:text-[1.65rem] flex items-center text-white">Tìm Kiếm Nâng Cao</h2>
                        </div>
                        <Suspense fallback={null}>
                            <FilterComic data={data} />
                        </Suspense>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Page;