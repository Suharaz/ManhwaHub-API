import { getChaptersByPage } from '@/services/comics'
import { ChapterProp } from '@/types/ComicProp';
import { MetadataRoute } from 'next'

export async function generateSitemaps() {
    const data = await getChaptersByPage(1);
    const totalPage = data.chapters.last_page;
    const sitemaps = Array.from({ length: totalPage }, (_, index) => ({ id: index + 1 }));
    return sitemaps;
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
    const page = id;
    const data = await getChaptersByPage(page);
    const chapters = data.chapters.data;
    return chapters.map((chapter: ChapterProp) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${chapter.comic.slug}/${chapter.slug}`,
        lastmod: chapter.updated_at,
        priority: 0.8
    }));
}