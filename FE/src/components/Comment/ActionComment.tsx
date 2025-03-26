"use client"
import axiosClient from '@/libs/axiosClient';
import { CommentProp } from '@/types/CommentProp';
import { useDisclosure } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegFlag, FaRegThumbsDown, FaRegThumbsUp, FaReply } from 'react-icons/fa';
import ModalDelete from '../Modal/Delete';

function ActionComment({comment, handleReply, handleLike, handleDislike ,handleReport}: {comment:CommentProp, handleReply: () => void, handleLike: () => void, handleDislike: () => void, handleReport: () => void}) {
    return (  
        <div className="ml-[60px] mt-1">
            <div className='flex gap-3'>
                <button onClick={handleReply} className="bg-transparent flex items-center hover:text-white transition-all gap-2 boder-none text-mediumGray font-semibold text-[14px] rounded-md">
                    <FaReply />
                    <span>
                        Trả lời
                    </span>
                </button>
                <button onClick={handleLike} aria-label='like' className="bg-transparent hover:text-white ml-2 transition-all flex items-center gap-1 boder-none text-mediumGray font-semibold text-[16px] rounded-md">
                    <FaRegThumbsUp />
                    <span>
                        {comment.likes || 0}
                    </span>
                </button>
                <button onClick={handleDislike} aria-label='dislike' className="bg-transparent ml-2 hover:text-white transition-all flex items-center gap-1 boder-none text-mediumGray font-semibold text-[16px] rounded-md">
                    <FaRegThumbsDown />
                    <span>
                        {comment.dislikes || 0}
                    </span>
                </button>
                <button onClick={handleReport} title='Báo cáo' aria-label='Report' className="bg-transparent hover:text-white transition-all ml-2 flex items-center gap-1 boder-none text-mediumGray font-semibold text-[16px] rounded-md">
                    <FaRegFlag />
                </button>
            </div>
        </div>
    );
}

export default ActionComment;

export function DropDownComment({ isOpenDrop, handleClick, reload, setReload, id, startEditing, fetchComments }: {isOpenDrop: boolean, handleClick: any, reload: boolean, setReload: any, id: number, startEditing: () => void, fetchComments: () => void}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onDeleteAction = async () => {
        await axiosClient.delete(`/api/comments/${id}`);
        await onClose();
        alert('Xóa thành công');
        setReload(!reload);
        fetchComments();
    }
    return (
        <>
        <div className='mt-[20px]'>
            <button onClick={handleClick}>
                <BsThreeDotsVertical />
            </button>
            {isOpenDrop && <div className='absolute'>
                <ul className='absolute w-max z-[100] bg-btnHover -top-[5px] rounded-lg p-[5px] -left-[70px] min-w-[7rem]'>
                    <li className='p-[5px] cursor-pointer hover:text-mediumGray' onClick={startEditing}>
                        Sửa
                    </li>
                    <li className='p-[5px] cursor-pointer hover:text-mediumGray' onClick={onOpen}>
                        Xóa
                    </li>
                </ul>
            </div>}
        </div>
        <ModalDelete handleDelete={onDeleteAction} message={`Bạn chắc chắn muốn xóa bình luận này?`} isOpen={isOpen} onClose={onClose} />
        </>
    )
}
