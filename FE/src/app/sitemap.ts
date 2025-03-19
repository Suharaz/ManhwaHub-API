import { getTotalComicAndChapter } from '@/services/comics'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getTotalComicAndChapter();
  const totalComic = data.totalPageComic;
  const totalChapter = data.totalPageChapter;

  const sitemaps = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/danh-sach/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/the-loai/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tac-gia/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tin-tuc/sitemap.xml`,
      lastModified: new Date(),
    }
  ]

  for (let i = 1; i <= totalComic; i++) {
    sitemaps.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/truyen-tranh/sitemap/${i}.xml`,
      lastModified: new Date(),
    });
  }

  for (let i = 1; i <= totalChapter; i++) {
    sitemaps.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/truyen-tranh/chuong/sitemap/${i}.xml`,
      lastModified: new Date(),
    });
  }

  return sitemaps;
}