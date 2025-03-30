/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { getAuthToken } from '@/hooks/useAuth';
import useLocalStorage from '@/hooks/useLocalStorage';
import axiosClient from '@/libs/axiosClient';
import { CommentProp } from '@/types/CommentProp';
import { UserProp } from '@/types/UserProp';
import { useEffect, useRef, useState, useCallback } from 'react';
import ActionComment, { DropDownComment } from './ActionComment';
import EditorCustom from './Editor';
import PaginationCustom from '../Pagination';
import { parseStyleString } from '@/utils';

function CommentTemplate({id, type, bg = false, chapter_id = null} : {id: number, type: string, bg?:boolean, chapter_id?: any}) {
    const [comments, setComments] = useState<CommentProp[] | null>(null);
    const [user, ] = useLocalStorage<UserProp | null>('user', null);
    const [login, setLogin] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [openDropdowns, setOpenDropdowns] = useState<any>({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [content, setContent] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const componentRef = useRef(null);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if(token) {
                setLogin(true);
            }
        };
        checkAuth();
    }, []);

    const fetchComments = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        
        const url = chapter_id ? `/api/comics/${id}/comments?page=${currentPage}` : `/api/comics/${id}/comments?page=${currentPage}`;
        await axiosClient.get(url)
        .then((response) => {
            setComments(response.data.data);
            setTotal(response.data.meta.totalComments);
            setTotalPage(response.data.meta.totalPages);
        })
        .catch(() => {
            setComments([]);
        });
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasFetched) {
                    fetchComments();
                    setHasFetched(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = componentRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [id, type, reload, currentPage, chapter_id]);

    useEffect(() => {
        fetchComments();
    }, [currentPage]);

    const onSubmitAction = async (content: string, ) => {
        if(content == '') {
            alert('Nội dung không được để trống');
            return;
        }
        await axiosClient.post('/api/comments', {
          
            content: content,
            comic_id: id,
            parent_id: replyingToCommentId
        }).then(() => {
            setContent('');
            setReplyContent('');
            setReplyingToCommentId(null);
            setReload(!reload);
            fetchComments();

        });
    };

    const onEditAction = async (id:number, content: string) => {
        if(content == '') {
            alert('Nội dung không được để trống');
            return;
        }
        await axiosClient.post('/baseapi/comments/update', {
            id: id,
            content: content
        });
        setEditingCommentId(null);
        setEditingContent('');
        setReload(!reload);
    }

    const toggleDropdown = (commentId: any) => {
        setOpenDropdowns((prevState : any) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const startEditing = (comment: any) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    };

    const handleCloseEditing = () => {
        setEditingCommentId(null);
        setEditingContent('');
    };

    const startReplying = (comment: any) => {
        setReplyingToCommentId(comment.id);
        setReplyContent(`@${comment.User.name}`);
    }

    const [likedComments, setLikedComments] = useLocalStorage<{[key: number]: boolean}>('likedComments', {});
    const [dislikedComments, setDislikedComments] = useLocalStorage<{[key: number]: boolean}>('dislikedComments', {});
    const [commentCounts, setCommentCounts] = useLocalStorage<{[key: number]: {likes: number, dislikes: number}}>('commentCounts', {});

    const handleLike = useCallback((id: number) => {
        if (dislikedComments[id]) {
            alert("Bạn đã dislike bình luận này rồi!");
            return;
        }
        
        if (!likedComments[id]) {
            setLikedComments(prev => ({...prev, [id]: true}));
            
            const newCounts = {
                ...commentCounts,
                [id]: {
                    likes: (commentCounts[id]?.likes || 0) + 1,
                    dislikes: commentCounts[id]?.dislikes || 0
                }
            };
            setCommentCounts(newCounts);
            
            setComments(prevComments => prevComments?.map(comment => {
                if (comment.id === id) {
                    return {...comment, likes: newCounts[id].likes};
                }
                if (comment.replies) {
                    comment.replies = comment.replies.map(reply => 
                        reply.id === id ? {...reply, likes: newCounts[id].likes} : reply
                    );
                }
                return comment;
            }) || null);
        } else {
            alert("Bạn đã like bình luận này rồi!");
        }
    }, [likedComments, dislikedComments, commentCounts]);

    const handleDislike = useCallback((id: number) => {
        if (likedComments[id]) {
            alert("Bạn đã like bình luận này rồi!");
            return;
        }
        
        if (!dislikedComments[id]) {
            setDislikedComments(prev => ({...prev, [id]: true}));
            
            const newCounts = {
                ...commentCounts,
                [id]: {
                    likes: commentCounts[id]?.likes || 0,
                    dislikes: (commentCounts[id]?.dislikes || 0) + 1
                }
            };
            setCommentCounts(newCounts);
            
            setComments(prevComments => prevComments?.map(comment => {
                if (comment.id === id) {
                    return {...comment, dislikes: newCounts[id].dislikes};
                }
                if (comment.replies) {
                    comment.replies = comment.replies.map(reply => 
                        reply.id === id ? {...reply, dislikes: newCounts[id].dislikes} : reply
                    );
                }
                return comment;
            }) || null);
        } else {
            alert("Bạn đã dislike bình luận này rồi!");
        }
    }, [likedComments, dislikedComments, commentCounts]);

    const handleReport = (id: number) => {
        alert('Report thành công');
    }

    // Cập nhật số liệu likes/dislikes từ localStorage vào comments
    useEffect(() => {
        if (comments) {
            const updatedComments = comments.map(comment => {
                const updatedComment = {
                    ...comment,
                    likes: commentCounts[comment.id]?.likes || 0,
                    dislikes: commentCounts[comment.id]?.dislikes || 0
                };
                
                if (comment.replies) {
                    updatedComment.replies = comment.replies.map(reply => ({
                        ...reply,
                        likes: commentCounts[reply.id]?.likes || 0,
                        dislikes: commentCounts[reply.id]?.dislikes || 0
                    }));
                }
                
                return updatedComment;
            });
            
            setComments(updatedComments);
        }
    }, [commentCounts]);

    return (
        <>
        <div ref={componentRef} className={`${!bg ? 'bg-btn border border-[#1e2c43]' : ''} text-white rounded-[1rem] flex flex-col p-5 mb-20 mt-10`}>
            <span className='mb-4 text-[30px] font-bold'>
                {total} Bình luận
            </span>
            <hr />
            {!comments ? <div className='flex justify-center mt-5' role="status">
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div> :
            <>
            {login && user ? <div>
                <div className='flex my-[10px] w-full'>
                    <div className='m-0'>
                        <img src={user.avatar} className='w-[52px] h-[52px] rounded-[16px]' alt="" />
                    </div>
                    <div className='ml-2 w-full'>
                        <EditorCustom handleSubmit={() => onSubmitAction(content)} content={content} setContent={setContent} />
                    </div>
                </div>
            </div>
            : <div className='flex mt-2 justify-between border border-mediumGray rounded-[8px] p-[15px]'>
                <div className='mt-1 font-bold text-white text-[17px]'>
                    Bạn cần đăng nhập để bình luận
                </div>
            </div>}
            {comments.map((comment, index) => (
                <div key={index}>
                    {editingCommentId !== comment.id ? <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <div className="flex items-center mt-[8px]">
                                <div className='flex items-center'>
                                    <img src={comment.User.avatar || '/assets/images/emo/thobua.gif'} className='w-[52px] h-[52px] rounded-[16px]' alt={comment.User.name} />
                                    <div className={`flex ml-[10px] text-[1rem] leading-[1.5rem] font-semibold`}>
                                        {comment.User.name}
                                    </div>
                                    {comment.User.exp && <span className="text-[12px] ml-2 rounded-[5px] px-[3px] border">
                                        EXP: {comment.User.exp}
                                    </span>}
                                </div>
                            </div>
                            <div className='ml-[60px] text-[15px]' dangerouslySetInnerHTML={{__html: comment.content}} />
                            {user && <ActionComment handleReport={() => handleReport(comment.id)} handleLike={() => handleLike(comment.id)} handleDislike={() => handleDislike(comment.id)} handleReply={() => startReplying(comment)} comment={comment} />}
                        </div>
                        {user && user.id == comment.User.id && <DropDownComment startEditing={() => startEditing(comment)} id={comment.id} reload={reload} setReload={setReload} handleClick={() => toggleDropdown(comment.id)} isOpenDrop={openDropdowns[comment.id]} fetchComments={fetchComments} />}
                    </div>
                    :<div>
                        <div className='flex my-[10px] w-full'>
                            <div className='m-0'>
                                <img src={comment.User.avatar || '/assets/images/emo/thobua.gif'} className='w-[52px] h-[52px] rounded-[16px]' alt="" />
                            </div>
                            <div className='ml-2 w-full'>
                                <EditorCustom handleSubmit={() => onEditAction(editingCommentId, editingContent)} edit={true} handleClose={handleCloseEditing} content={editingContent} setContent={setEditingContent} />
                            </div>
                        </div>
                    </div>}
                    {replyingToCommentId === comment.id && <div>
                        <div className='flex my-[10px] w-full'>
                            <div className='m-0'>
                                <img src={user?.avatar || '/assets/images/emo/thobua.gif'} className='w-[52px] h-[52px] rounded-[16px]' alt="" />
                            </div>
                            <div className='ml-2 w-full'>
                                <EditorCustom handleSubmit={() => onSubmitAction(replyContent)} content={replyContent} setContent={setReplyContent} />
                            </div>
                        </div>
                    </div>}
                    {comment.replies && comment.replies.map((reply) => (
                    <div key={reply.id} className='ml-[25px] border-l border-white pl-[15px]'>
                        {editingCommentId !== reply.id ? <div className='flex justify-between'>
                            <div className='flex flex-col'>
                                <div className="flex items-center mt-[8px]">
                                    <div className='flex items-center'>
                                        <img src={reply.User.avatar || '/assets/images/emo/thobua.gif'} className='w-[52px] h-[52px] rounded-[16px]' alt={reply.User.name} />
                                        <div className={`flex ml-[10px] text-[16px] leading-[1.5rem] font-semibold`}>
                                        {reply.User.name}
                                        </div>
                                        {reply.User.exp && <span className="text-[12px] ml-2 rounded-[5px] px-[3px] border">
                                            EXP: {reply.User.exp}
                                        </span>}
                                    </div>
                                </div>
                                <div className='ml-[60px] text-[15px]' dangerouslySetInnerHTML={{__html: reply.content}} />
                                {user && <ActionComment handleReport={() => handleReport(reply.id)} handleLike={() => handleLike(reply.id)} handleDislike={() => handleDislike(reply.id)} handleReply={() => startReplying(reply)} comment={reply} />}
                            </div>
                            {user && user.id == reply.User.id && <DropDownComment startEditing={() => startEditing(reply)} id={reply.id} reload={reload} setReload={setReload} handleClick={() => toggleDropdown(reply.id)} isOpenDrop={openDropdowns[reply.id]} fetchComments={fetchComments} />}
                        </div> : 
                        <div>
                            <div className='flex my-[10px] w-full'>
                                <div className='m-0'>
                                    <img src={reply.User.avatar || '/assets/images/emo/thobua.gif'} className='w-[52px] h-[52px] rounded-[16px]' alt="" />
                                </div>
                                <div className='ml-2 w-full'>
                                    <EditorCustom handleSubmit={() => onEditAction(editingCommentId, editingContent)} edit={true} handleClose={handleCloseEditing} content={editingContent} setContent={setEditingContent} />
                                </div>
                            </div>
                        </div>}
                        {replyingToCommentId === reply.id && <div>
                        <div className='flex my-[10px] w-full'>
                            <div className='m-0'>
                                <img src={reply.User.avatar || '/assets/images/emo/thobua.gif'} className='w-[52px] h-[52px] rounded-[16px]' alt="" />
                            </div>
                            <div className='ml-2 w-full'>
                                <EditorCustom handleSubmit={() => onSubmitAction(replyContent)} content={replyContent} setContent={setReplyContent} />
                            </div>
                        </div>
                    </div>}
                    </div>
                    ))}
                </div>
            ))}
            <div className='mt-10 w-full flex justify-center'>
                <PaginationCustom totalPage={totalPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
            </>}
        </div>
        </>
    );
}

export default CommentTemplate;
