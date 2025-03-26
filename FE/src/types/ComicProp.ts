import { BlogProp } from "./BlogProp";
import { CommentProp } from "./CommentProp";
import { UserProp } from "./UserProp";

export interface HomeProp {
    comicsPopular: ComicProp[];
    comicsRecent: ComicProp[];
}

export interface DetailProp {
    status: string;
    comic: ComicProp;
    comicsRelated: ComicProp[];
    meta: any;
    ads1: any;
    ads2: any;
    ads: any;
}

export interface ReadProp {
    currentChapter: ChapterProp;
    nextChapter: ChapterProp;
    prevChapter: ChapterProp;
    
}

export interface ComicProp {
    id: number;
    name: string;
    origin_name: string;
    slug: string;
    content: string;
    thumbnail: string;
    status: number;
    view_total: number;
    view_day: number;
    view_week: number;
    view_month: number;
    created_at: string;
    updated_at: string;
    Categories: CategoryProp[];
    votes_count: number;
    follow_total: number;
    Authors: AuthorProp[];
    Translators: TranslatorProp[];
    Chapters: ChapterProp[];
    chapters_count: number;
    last_chapter: ChapterProp;
    comments: CommentProp[];
    votes_avg_value: number;
}

export interface CategoryProp {
    id: number;
    name: string;
    slug: string;
    description: string;
}

export interface AuthorProp {
    id: number;
    name: string;
    slug: string;
}

export interface TranslatorProp {
    id: number;
    name: string;
    slug: string;
    description: string;
    thumbnail: string;
    title_seo: string;
    meta_keywords: string;
    meta_description: string;
}

export interface ChapterProp {
    id: number;
    name: string;
    slug: string;
    title: string;
    price: number;
    chapter_number: number;
    created_at: string;
    updated_at: string;
    server_name: string;
    images: ImageProp[];
    comic: ComicProp;
    user: UserProp;
    content: string;
    translator: TranslatorProp;
}

export interface ImageProp {
    src: string;
    page: number;
}