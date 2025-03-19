/* eslint-disable @next/next/no-img-element */
import PaginateComic from "@/components/Client/Paginate";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Guest";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "@/services/blogs";
import { HomeBlogProp } from "@/types/BlogProp";
import { formatDate } from "@/utils/date";

async function PageBlog({searchParams}: {searchParams: {page?: number}}) {
    const page = searchParams.page || 1;
    const data: HomeBlogProp = await getBlogs(page);
    const mostViewedBlog = data.mostView[0] || null;

    const twoMostViewedBlog = data.mostView.slice(1, 3) || [];
    return (
        <>
            <Header />
            <main className="bg-gradient-5">
                {page == 1 && <section className="py-20">
                    <div className="max-w-[1170px] mx-auto overflow-hidden relative">
                        <div className="flex flex-wrap gap-x-7.5 gap-y-9 px-4">
                            {mostViewedBlog && <div className="w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11 bg-mainSec shadow-1 rounded-xl p-4 lg:p-2.5">
                                <div className="lg:max-w-[536px] w-full">
                                    <Link href={`/tin-tuc/${mostViewedBlog.slug}`}>
                                        <Image width={500} height={300} className="w-full rounded-xl" src={mostViewedBlog.poster} alt="blog" />
                                    </Link>
                                </div>
                                <div className="lg:max-w-[540px] w-full">
                                    <h1 className="font-bold text-2xl line-clamp-2 text-ellipsis text-white hover:text-[#d0e6a5] mb-4">
                                        <Link href={`/tin-tuc/${mostViewedBlog.slug}`}>
                                            {mostViewedBlog.title}
                                        </Link>
                                    </h1>
                                    <div className="max-w-[524px] line-clamp-3 text-ellipsis text-mediumGray" dangerouslySetInnerHTML={{__html: mostViewedBlog.content}}></div>
                                    <div className="flex items-center gap-2.5 mt-5 text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="flex w-10 h-10 rounded-full overflow-hidden">
                                                <img src={mostViewedBlog.user.avatar} alt="user" />
                                            </div>
                                            <p className="text-s">{mostViewedBlog.user.name}</p>
                                        </div>
                                        <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                        <p className="text-sm text-mediumGray">{formatDate(mostViewedBlog.created_at)}</p>
                                    </div>
                                </div>
                            </div>}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                                {twoMostViewedBlog.map(blog => (
                                <div key={blog.id} className="lg:max-w-[570px] w-full flex flex-col sm:flex-row sm:items-center gap-6 bg-mainSec shadow-1 rounded-xl p-2.5">
                                    <div className="lg:max-w-[238px] w-full">
                                        <Link href={`/tin-tuc/${blog.slug}`}>
                                            <Image width={238} height={150} className="w-full rounded-lg h-[220px] sm:h-[150px]" src={blog.poster} alt={blog.title} />
                                        </Link>
                                    </div>
                                    <div className="lg:max-w-[272px] w-full">
                                        <h2 className="font-semibold mb-3">
                                            <Link href={`/tin-tuc/${blog.slug}`} className="line-clamp-3 text-lg text-ellipsis text-white hover:text-[#d0e6a5] mb-4">
                                                {blog.title}
                                            </Link>
                                        </h2>
                                        <div className="flex items-center gap-2.5 text-mediumGray">
                                            <p className="text-sm">
                                                <span>{blog.user.name}</span>
                                            </p>
                                            <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                            <p className="text-sm">{formatDate(blog.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>}
                <section className="pt-20 pb-40">
                    <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                        <div className="mb-12.5 text-center">
                            <h2 className="text-white mb-3.5 text-2xl font-bold sm:text-4xl">
                            Bài Viết Mới Nhất
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 gap-x-7.5">
                            {data.data.data.length > 0 && data.data.data.map(blog => (
                            <div className="group bg-mainSec p-2 rounded-lg" key={blog.id}>
                                <div className="mb-6 overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
                                    <Link href={`/tin-tuc/${blog.slug}`}>
                                        <Image width={200} height={150} src={blog.poster} alt="image" className="w-full" />
                                    </Link>
                                </div>
                                <h3>
                                    <Link href={`/tin-tuc/${blog.slug}`} className="block text-white font-bold text-xl mb-3.5 line-clamp-2 text-ellipsis">
                                        <span className="duration-300 transition-all group-hover:text-[#d0e6a5]">
                                            {blog.title}
                                        </span>
                                    </Link>
                                </h3>
                                <div className="line-clamp-3 text-ellipsis text-mediumGray" dangerouslySetInnerHTML={{__html: blog.content}}></div>
                                <div className="flex flex-wrap gap-3 items-center justify-between mt-4.5">
                                    <div className="flex items-center gap-2.5 text-mediumGray">
                                        <div className="flex items-center gap-3">
                                            <div className="flex w-12 h-12 rounded-full overflow-hidden">
                                                <img src={blog.user.avatar} alt="user" />
                                            </div>
                                            <p className="text-sm font-bold">{blog.user.name}</p>
                                        </div>
                                        <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
                                        <p className="text-sm">{formatDate(blog.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        <div className="mt-20">
                            <PaginateComic currentPage={data.data.current_page} totalPage={data.data.last_page}  />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default PageBlog;