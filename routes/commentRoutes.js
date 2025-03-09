const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/auth');


/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Thêm bình luận hoặc trả lời
 *     description: Thêm một bình luận mới hoặc trả lời một bình luận hiện có
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nội dung của bình luận hoặc trả lời
 *               parent_id:
 *                 type: string
 *                 description: ID của bình luận cha (nếu là trả lời)
 *               comic_id:
 *                 type: string
 *                 description: ID của truyện tranh liên quan
 *     responses:
 *       '201':
 *         description: Bình luận hoặc trả lời đã được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bình luận hoặc trả lời đã được thêm thành công"
 *                 comment_id:
 *                   type: string
 *                   example: "1"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.use(authenticate);
router.post('/', commentController.addCommentOrReply);
/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     summary: Chỉnh sửa bình luận
 *     description: Chỉnh sửa nội dung của một bình luận cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bình luận cần chỉnh sửa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nội dung mới của bình luận
 *     responses:
 *       '200':
 *         description: Bình luận đã được chỉnh sửa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bình luận đã được chỉnh sửa thành công"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy bình luận
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/:commentId', commentController.editComment);
/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Xóa bình luận
 *     description: Xóa một bình luận cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bình luận cần xóa
 *     responses:
 *       '200':
 *         description: Bình luận đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bình luận đã được xóa thành công"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy bình luận
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
