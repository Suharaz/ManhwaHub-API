import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import SidebarUser from "@/components/Sidebar/SidebarUser";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME} - Đọc Truyện Online Miễn Phí`,
}

function LayoutUser({ children }: Readonly<{ children: React.ReactNode }>) {
    return ( 
       <>
        <Header />
        <main className="relative flex-grow bg-gradient-5 min-h-screen">
            <div className="container mx-auto px-[10px]">
                <div className="mt-8 rounded-lg relative flex max-lg:flex-col">
                    <SidebarUser />
                    <aside className="ml-6 flex-grow flex flex-col max-lg:w-full max-lg:ml-0 text-mediumGray">
                        {children}
                    </aside>
                </div>
            </div>
        </main>
        <Footer />
       </>
    );
}

export default LayoutUser;