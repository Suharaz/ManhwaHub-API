/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import { getBlog } from "@/services/blogs";
import { DetailProp } from "@/types/BlogProp";
import { formatDate } from "@/utils/date";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
    const {slug} = params;
    const data: DetailProp = await getBlog(slug);
    if(data === null) {
        notFound();
    }else if(data.status === "error") {
        notFound();
    }
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`),
      title: data.data.meta_title,
      description: data.data.meta_description,
      keywords: data.data.meta_keywords,
      referrer: 'origin-when-cross-origin',
      openGraph: {
        type: 'article',
        locale: "vi_VN",
        url: '/',
        images: [data.data.poster],
      },
      alternates: {
        canonical: '/',
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      }
    }
}

async function page({params}: {params: {slug: string}}) {
    const slug = params.slug;
    const data: DetailProp = await getBlog(slug);
    return (  
        <>
        <Header />
        <main className="bg-gradient-5">
            <section className="pt-30 pb-17.5">
                <div className="max-w-[1030px] mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="max-w-[770px] mx-auto text-center">
                        <h1 className="font-bold text-2xl sm:text-4xl text-white mb-5">
                            {data.data.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 mt-7.5">
                            <div className="flex w-12.5 h-12.5 rounded-full overflow-hidden">
                                <img src={data.data.user.avatar} alt="user" />
                            </div>
                            <div className="text-left text-mediumGray">
                                <h4 className="font-medium text-custom-lg text-dark mb-1">
                                    {data.data.user.name}
                                </h4>
                                <div className="flex items-center gap-1.5">
                                    <p>{formatDate(data.data.created_at)}</p>
                                    <span className="flex w-[3px] h-[3px] rounded-full bg-white"></span>
                                    <p>{data.data.view_total} lượt đọc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-[770px] mx-auto text-white detail-blog">
                        <div dangerouslySetInnerHTML={{__html: data.data.content}}></div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    );
}

export default page;