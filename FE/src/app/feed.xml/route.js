import RSS from 'rss'
import { getComics } from '@/services/comics'
export async function GET(){
    const data = await getComics();
    const comics = data.comicsRecent;
    const meta = data.meta;
    const feed = new RSS({
        title: meta.title,
        description: meta.description,
        site_url: process.env.NEXT_PUBLIC_BASE_URL,
        feed_url: `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml`,
        copyright: `${new Date().getFullYear()} ${meta.title}`,
        language: 'vi',
        pubDate: new Date(),
    })
    
    comics.forEach(comic => {
        feed.item({
            title: comic.name,
            description: comic.content,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`,
            guid: `${process.env.NEXT_PUBLIC_BASE_URL}/${comic.slug}`,
            date: comic.updated_at,
        })
    })

    return new Response(feed.xml(), {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    })
}