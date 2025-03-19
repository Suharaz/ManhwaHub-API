import { MetadataRoute } from 'next'
import { getAllCategories } from '@/services/categories';
import { CategoryProp } from '@/types/ComicProp';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const data = await getAllCategories();
    return data.categories.map((category: CategoryProp) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/the-loai/${category.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8
    }));
}