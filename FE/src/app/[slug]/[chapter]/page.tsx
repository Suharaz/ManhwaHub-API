/* eslint-disable @next/next/no-img-element */
import { SaveHistory } from "@/components/Client/History";
import ImageComic from "@/components/Client/Image";
import Pay from "@/components/Client/PayFee";
import UpView from "@/components/Client/UpView";
import { getAuthToken } from "@/hooks/useAuth";
import { getChapter } from "@/services/comics";
import { ReadProp } from "@/types/ComicProp";
import { Metadata } from "next";
import { notFound } from "next/navigation";

let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';
// export async function generateMetadata({params}: {params: {slug: string, chapter: string}}): Promise<Metadata> {
//     const data: ReadProp = await getChapter(params.slug, params.chapter);
//     if(data === null) {
//         notFound();
//     }else if(data.status === "error") {
//         notFound();
//     }
//     const meta = data.meta;
//     return {
//       metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/${params.slug}/${params.chapter}`),
//       title: meta.title_read_comic,
//       description: meta.description_read_comic,
//       keywords: meta.keywords_read_comic,
//       referrer: 'origin-when-cross-origin',
//       openGraph: {
//         type: 'article',
//         locale: "vi_VN",
//         url: '/',
//         images: [data.comic.thumbnail],
//       },
//       alternates: {
//         canonical: '/',
//       },
//       robots: {
//         index: true,
//         follow: true,
//         nocache: true,
//         googleBot: {
//           index: true,
//           follow: false,
//           noimageindex: true,
//           'max-video-preview': -1,
//           'max-image-preview': 'large',
//           'max-snippet': -1,
//         },
//       }
//     }
// }

async function PageRead({ params }: { params: { slug: string, chapter: string } }) {
    const token = await getAuthToken();
    const fetchUrl = `${baseUrl}/chapters/${params.chapter}`;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    
    if (token?.value) {
        headers['Authorization'] = `Bearer ${token.value}`;
    }
    
    const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: headers,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        // console.error('Response is not JSON:', text);
        return <div>Response is not JSON: {text}</div>;
    }

    const data = await response.json();

    if (data === null || data.status === "error") {
        notFound();
    } else if (data.status === "info") {

        return <Pay message={data.message} id={Number(data.currentChapter)} />;
    }
    console.log("Fetched Data:", data);

    return (
        <>
          
             <ImageComic data={data.data} />
            <UpView id={data.data.comics.id} type="comic" />
            <SaveHistory id={data.data.comics.id} chapter={data.data.currentChapter.id} type="comic" />
       
        </>
    );
}

export default PageRead;

