import { UserProp } from "./UserProp";

export interface CommentProp {
    id: number;
    content: string;
    parent_id: number | null;
    created_at: string;
    updated_at?: string;
    User: {
        id: number;
        name: string;
        exp: number;
        avatar?: string;
    };
    replies: CommentProp[];
    // Giữ lại các trường cũ để tương thích
    comic_id?: number;
    chapter_id?: any;
    user_id?: number;
    total_like?: number;
    total_dislike?: number;
    total_report?: number;
    likes?: number;
    dislikes?: number;
    user?: UserProp;
}
