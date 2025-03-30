const express = require('express');
const router = express.Router();
const comicController = require('../controllers/comicController');
const commentController = require('../controllers/commentController');
const authenticate = require('../middleware/auth');

/**
 * @swagger
 * /api/comics/{id}/comments:
 *   get:
 *     summary: Lấy danh sách bình luận của truyện tranh
 *     description: Lấy danh sách tất cả các bình luận của một truyện tranh cụ thể
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh
 *     responses:
 *       '200':
 *         description: Danh sách bình luận đã được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   content:
 *                     type: string
 *                     example: "Bình luận về truyện tranh"
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:id/comments', commentController.getCommentsByComic);
router.get('/:id/rating', comicController.getRatingByComic);
/**
 * @swagger
 * /api/comics:
 *   post:
 *     summary: Tạo truyện tranh mới
 *     description: Tạo một truyện tranh mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề của truyện tranh
 *               author_id:
 *                 type: string
 *                 description: ID của tác giả
 *               description:
 *                 type: string
 *                 description: Mô tả của truyện tranh
 *     responses:
 *       '201':
 *         description: Truyện tranh đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Truyện tranh đã được tạo thành công"
 *                 comic_id:
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
router.post('/', comicController.createComic);
/**
 * @swagger
 * /api/comics/{id}:
 *   put:
 *     summary: Cập nhật truyện tranh
 *     description: Cập nhật thông tin của một truyện tranh cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề mới của truyện tranh
 *               description:
 *                 type: string
 *                 description: Mô tả mới của truyện tranh
 *     responses:
 *       '200':
 *         description: Truyện tranh đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Truyện tranh đã được cập nhật thành công"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/:id', comicController.updateComic);
/**
 * @swagger
 * /api/comics/{id}:
 *   delete:
 *     summary: Xóa truyện tranh
 *     description: Xóa một truyện tranh cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh cần xóa
 *     responses:
 *       '200':
 *         description: Truyện tranh đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Truyện tranh đã được xóa thành công"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.delete('/:id', comicController.deleteComic);
/**
 * @swagger
 * /api/comics/{id}/follow:
 *   post:
 *     summary: Theo dõi truyện tranh
 *     description: Theo dõi một truyện tranh cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh cần theo dõi
 *     responses:
 *       '200':
 *         description: Truyện tranh đã được theo dõi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Truyện tranh đã được theo dõi thành công"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/:id/follow', comicController.followComic);
/**
 * @swagger
 * /api/comics/{id}/unfollow:
 *   delete:
 *     summary: Hủy theo dõi truyện tranh
 *     description: Hủy theo dõi một truyện tranh cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh cần hủy theo dõi
 *     responses:
 *       '200':
 *         description: Truyện tranh đã được hủy theo dõi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Truyện tranh đã được hủy theo dõi thành công"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.delete('/:id/unfollow', comicController.unfollowComic);
/**
 * @swagger
 * /api/comics/{id}/rate:
 *   put:
 *     summary: Đánh giá truyện tranh
 *     description: Đánh giá một truyện tranh cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh cần đánh giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: Điểm đánh giá (từ 1 đến 5)
 *     responses:
 *       '200':
 *         description: Truyện tranh đã được đánh giá thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Truyện tranh đã được đánh giá thành công"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/:id/rating', comicController.rateComic);

router.put('/:id/upView', comicController.upViewComic);
module.exports = router;
