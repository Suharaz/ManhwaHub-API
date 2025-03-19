/* eslint-disable @next/next/no-img-element */
import PaginateComic from "@/components/Client/Paginate";
import Header from "@/components/Header/Guest";
import HeaderFilter from "@/components/HeaderFilter";
import ItemComic from "@/components/ItemComic";
import { getComicsByAuthor } from "@/services/comics";
import { ListAuthorProps } from "@/types";
import { formatView } from "@/utils/view";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({params, searchParams}: {params: {slug: string}, searchParams: {page?: number}}): Promise<Metadata> {
    const page = searchParams.page || 1;
    const {slug} = params;
    const data: ListAuthorProps = await getComicsByAuthor(slug, page);
    if(data === null) {
        notFound();
    }else if(data.status === "error") {
        notFound();
    }
    const meta = data.meta;
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/tac-gia/${slug}`),
      title: meta.title_author,
      description: meta.description_author,
      keywords: meta.keywords_author,
      openGraph: {
        type: 'website',
        locale: "vi_VN",
        url: '/',
        images: ['/logo.png'],
      },
      alternates: {
        canonical: '/',
      },
    }
}

async function Page({params, searchParams}: {params: {slug: string}, searchParams: {page?: number}}) {
    const page = searchParams.page || 1;
    const data: ListAuthorProps = await getComicsByAuthor(params.slug, page);
    if(data === null) {
        notFound();
    }else if(data.status === "error") {
        notFound();
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": process.env.NEXT_PUBLIC_BASE_URL,
        "name": data.meta.title_author,
        "description": data.meta.description_author,
    }

    const jsonLDList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": data.meta.title_author,
        "description": data.meta.description_author,
        "itemListElement": data.data.data.map((comic, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`,
            "name": comic.name,
        }))
    }
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDList)}}
            />
            <Header />
            <main className="bg-gradient-5 pb-28 flex-grow relative block">
                <div className="container mx-auto overflow-hidden min-h-screen">
                    {data.ads && <div className="flex justify-center">
                    <a target="_blank" href={data.ads.url} className="mt-5 mb-7">
                        <img src={data.ads.image} alt="qc" />
                    </a>
                    </div>}
                    <section className="mt-12 mb-10">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-[1.3rem] sm:text-[1.65rem] flex items-center text-white">{data.title}</h2>
                            <span className="text-mediumGray">{formatView(data.data.total)} bộ truyện</span>
                        </div>
                        <HeaderFilter categories={data.categories} />
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                            {data.data.data.map((comic) => (
                                <div key={comic.id} className="flex">
                                   <ItemComic comic={comic} />
                                </div>
                            ))}
                        </div>
                        <PaginateComic currentPage={data.data.current_page} totalPage={data.data.last_page} />
                    </section>
                </div>
            </main>
        </>
    );
}

export default Page;