import { CategoryProp, ComicProp } from "./ComicProp";

export interface OptionProps {
    id: any;
    name: string;
}

export interface ListTypeProps {
    status: string;
    title: string;
    data: PaginateComicProps;
    categories:CategoryProp[];
    ads: any;
}

export interface ListCategoryProps {
    status: string;
    title: string;
    data: PaginateComicProps;
    meta: any;
    categories:CategoryProp[];
    ads: any;
}

export interface ListAuthorProps {
    status: string;
    title: string;
    meta: any;
    data: PaginateComicProps;
    categories:CategoryProp[];
    ads: any;
}

export interface PaginateComicProps {
    current_page: number;
    data: ComicProp[];
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    total: number;
    per_page: number;
    to: number;
}

export interface NotificationProps {
    id: number;
    title: string;
    created_at: string;
    status: string;
    content: string;
}
