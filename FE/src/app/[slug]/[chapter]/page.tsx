/* eslint-disable @next/next/no-img-element */
import { SaveHistory } from "@/components/Client/History";
import ImageComic from "@/components/Client/Image";
import Pay from "@/components/Client/PayFee";
import UpView from "@/components/Client/UpView";
import { getChapter } from "@/services/comics";
import { ReadProp } from "@/types/ComicProp";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({params}: {params: {slug: string, chapter: string}}): Promise<Metadata> {
    const data: ReadProp = await getChapter(params.slug, params.chapter);
    if(data === null) {
        notFound();
    }else if(data.status === "error") {
        notFound();
    }
    const meta = data.meta;
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/${params.slug}/${params.chapter}`),
      title: meta.title_read_comic,
      description: meta.description_read_comic,
      keywords: meta.keywords_read_comic,
      referrer: 'origin-when-cross-origin',
      openGraph: {
        type: 'article',
        locale: "vi_VN",
        url: '/',
        images: [data.comic.thumbnail],
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

async function PageRead({params}: {params: {slug: string, chapter: string}}) {
    const data: ReadProp = await getChapter(params.slug, params.chapter);
    if(data === null) {
        notFound();
    }else if(data.status === "error") {
        notFound();
    }else if(data.status === "info") {
        return <Pay message={data.message} id={data.currentChapter.id} />;
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "url": process.env.NEXT_PUBLIC_BASE_URL,
        "name": data.meta.title_read_comic,
        "description": data.meta.description_read_comic,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": process.env.NEXT_PUBLIC_BASE_URL
        },
        "headline": data.meta.title_read_comic,
        "datePublished": data.comic.created_at,
        "dateModified": data.comic.updated_at,
        "publisher": {
            "@type": "Organization",
            "name": process.env.NEXT_PUBLIC_APP_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": process.env.NEXT_PUBLIC_BASE_URL + "/logo.png"
            }
        },
        "image": data.comic.thumbnail,
    }
    return (  
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ImageComic data={data} />
            <UpView id={data.comic.id} type="comic" />
            <SaveHistory id={data.comic.id} chapter={data.currentChapter.id} type="comic" />
        </>
    );
}
export default PageRead;