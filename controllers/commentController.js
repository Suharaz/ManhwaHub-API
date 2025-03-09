const Comment = require('../models/comments');
const User = require('../models/user');
const Comic = require('../models/comic');
const { Sequelize } = require('sequelize');

exports.getCommentsByComic = async (req, res) => {
    try {
        const { id } = req.params;
        let { page = 1, limit = 10 } = req.query;

        if (isNaN(id) || isNaN(page) || isNaN(limit)) {
            return res.status(400).json({ status: 'error', message: 'Invalid parameters' });
        }

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        // Lấy tổng số comment gốc để tính tổng số trang
        const totalRootComments = await Comment.count({
            where: { comic_id: id, parent_id: null }
        });

        const totalPages = Math.ceil(totalRootComments / limit);

        // Lấy danh sách comment gốc có phân trang
        const rootComments = await Comment.findAll({
            where: { comic_id: id, parent_id: null },
            attributes: ['id', 'content', 'parent_id', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name','exp'] 
                }
            ],
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        // Lấy danh sách tất cả comment con liên quan đến comment gốc
        const rootIds = rootComments.map(comment => comment.id);
        let childComments = [];

        if (rootIds.length > 0) {
            childComments = await Comment.findAll({
                where: { comic_id: id, parent_id: rootIds },
                attributes: ['id', 'content', 'parent_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name','exp']
                    }
                ],
                order: [['created_at', 'ASC']] // Giữ nguyên thứ tự cũ nhất trước
            });
        }

        // Chuyển dữ liệu thành dạng cây
        const commentMap = {};
        const structuredComments = [];

        [...rootComments, ...childComments].forEach(comment => {
            const commentData = comment.get({ plain: true });
            commentData.replies = [];

            commentMap[commentData.id] = commentData;

            if (commentData.parent_id) {
                if (commentMap[commentData.parent_id]) {
                    commentMap[commentData.parent_id].replies.push(commentData);
                } else {
                    commentMap[commentData.parent_id] = { replies: [commentData] };
                }
            } else {
                structuredComments.push(commentData);
            }
        });

        res.status(200).json({
            status: 'success',
            data: structuredComments,
            meta: {
                currentPage: page,
                totalPages,
                totalComments: totalRootComments
            }
        });
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ status: 'error', message: 'Error getting comments', error });
    }
};

exports.getCommentsByChapter = async (req, res) => {
    try {
        const { comic_id, chapter_id } = req.params;
        let { page = 1, limit = 10 } = req.query;

        if (isNaN(comic_id) || isNaN(page) || isNaN(limit)) {
            return res.status(400).json({ status: 'error', message: 'Invalid parameters' });
        }

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        // Đếm số comment gốc (parent_id = null) theo comic_id và chapter_id
        const totalRootComments = await Comment.count({
            where: { comic_id, chapter_id, parent_id: null }
        });

        const totalPages = Math.ceil(totalRootComments / limit);

        // Lấy danh sách comment gốc có phân trang
        const rootComments = await Comment.findAll({
            where: { comic_id, chapter_id, parent_id: null },
            attributes: ['id', 'content', 'parent_id', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name','exp'] 
                }
            ],
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        // Lấy danh sách tất cả comment con liên quan đến comment gốc
        const rootIds = rootComments.map(comment => comment.id);
        let childComments = [];

        if (rootIds.length > 0) {
            childComments = await Comment.findAll({
                where: { comic_id, chapter_id, parent_id: rootIds },
                attributes: ['id', 'content', 'parent_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes:  ['id', 'name','exp'] 
                    }
                ],
                order: [['created_at', 'ASC']] // Comment con hiển thị theo thứ tự cũ nhất trước
            });
        }

        // Chuyển dữ liệu thành dạng cây
        const commentMap = {};
        const structuredComments = [];

        [...rootComments, ...childComments].forEach(comment => {
            const commentData = comment.get({ plain: true });
            commentData.replies = [];

            commentMap[commentData.id] = commentData;

            if (commentData.parent_id) {
                if (commentMap[commentData.parent_id]) {
                    commentMap[commentData.parent_id].replies.push(commentData);
                } else {
                    commentMap[commentData.parent_id] = { replies: [commentData] };
                }
            } else {
                structuredComments.push(commentData);
            }
        });

        res.status(200).json({
            status: 'success',
            data: structuredComments,
            meta: {
                currentPage: page,
                totalPages,
                totalComments: totalRootComments
            }
        });
    } catch (error) {
        console.error('Error getting comments by chapter:', error);
        res.status(500).json({ status: 'error', message: 'Error getting comments by chapter', error });
    }
};

exports.addCommentOrReply = async (req, res) => {
    try {
        const { comic_id, chapter_id, parent_id, content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ status: 'error', message: 'Comment content is required' });
        }

        // Kiểm tra xem parent_id có tồn tại không nếu là reply
        if (parent_id) {
            const parentComment = await Comment.findByPk(parent_id); // Kiểm tra parent_id có trong cơ sở dữ liệu không
            if (!parentComment) {
                return res.status(400).json({ status: 'error', message: 'Parent comment not found' });
            }
        }

        // Tạo mới comment hoặc reply
        await Comment.create({
            comic_id: comic_id,
            chapter_id: chapter_id || null,  // Giữ nguyên nếu chapter_id có thể null
            user_id: req.user.id,
            parent_id: parent_id || null,  // Nếu không có parent_id thì là comment gốc
            content: content.trim()
        });

        res.status(201).json({
            status: 'success',
            message: parent_id ? 'Reply added successfully' : 'Comment added successfully',
        });
    } catch (error) {
        console.error('Error adding comment or reply:', error);
        res.status(500).json({ status: 'error', message: 'Database error', error });
    }
};

exports.editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                status: 'error',
                message: 'Comment content is required',
            });
        }

        // Tìm bình luận theo commentId
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found',
            });
        }

        // Kiểm tra quyền sửa bình luận
        if (comment.user_id !== req.user.id && req.user.role_id !== 2) {
            return res.status(403).json({
                status: 'error',
                message: 'Permission denied. You can only edit your own comments or you must be an admin.',
            });
        }

        // Cập nhật bình luận
        await comment.update({ content: content.trim() });
        res.status(200).json({
            status: 'success',
            message: 'Comment updated successfully',
        });
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).json({ status: 'error', message: 'Error editing comment', error });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        // Tìm bình luận theo commentId
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({
                status: 'error',
                message: 'Comment not found',
            });
        }

        // Kiểm tra quyền xóa bình luận
        if (comment.user_id !== req.user.id && req.user.role_id !== 2) {
            return res.status(403).json({
                status: 'error',
                message: 'Permission denied. Only admins can delete comments.',
            });
        }

        // Xóa bình luận
        await comment.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ status: 'error', message: 'Error deleting comment', error });
    }
};

