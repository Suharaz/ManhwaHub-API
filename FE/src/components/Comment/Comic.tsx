import CommentTemplate from '.';

function CommentComic({ id, bg, chapter_id }: { id: number, bg?: boolean, chapter_id?: number }) {
    return (
        <CommentTemplate id={id} bg={bg} chapter_id={chapter_id} type="comic" />
    );
}

export default CommentComic;