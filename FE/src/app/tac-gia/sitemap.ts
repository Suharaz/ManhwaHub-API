import { MetadataRoute } from 'next'
import { getAllAuthors } from '@/services/authors';
import { AuthorProp } from '@/types/ComicProp';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await getAllAuthors();
    return data.authors.map((author: AuthorProp) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/tac-gia/${author.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7
    }));
}