import { UserProp } from "./UserProp";

export interface BlogProp {
    id: number;
    title: string;
    slug: string;
    content: string;
    poster: string;
    user: UserProp;
    updated_at: string;
    created_at: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    view_total: number;
}

export interface HomeBlogProp {
    status: string;
    data: PaginateBlogProps;
    mostView: BlogProp[];
}

export interface PaginateBlogProps {
    current_page: number;
    data: BlogProp[];
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    total: number;
    per_page: number;
    to: number;
}

export interface DetailProp {
    status: string;
    data: BlogProp;
}