const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const authenticate = require('../middleware/auth');

/**
 * @swagger
 * /api/chapters:
 *   post:
 *     summary: Tạo chương mới
 *     description: Tạo một chương mới cho truyện tranh
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comic_id:
 *                 type: string
 *                 description: ID của truyện tranh
 *               title:
 *                 type: string
 *                 description: Tiêu đề của chương
 *               content:
 *                 type: string
 *                 description: Nội dung của chương
 *     responses:
 *       '201':
 *         description: Chương đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chương đã được tạo thành công"
 *                 chapter_id:
 *                   type: string
 *                   example: "1"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/', authenticate, chapterController.createChapter);
/**
 * @swagger
 * /api/chapters/{id}:
 *   put:
 *     summary: Cập nhật chương
 *     description: Cập nhật thông tin của một chương cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của chương cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tiêu đề mới của chương
 *               content:
 *                 type: string
 *                 description: Nội dung mới của chương
 *     responses:
 *       '200':
 *         description: Chương đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chương đã được cập nhật thành công"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy chương
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/:id', authenticate, chapterController.updateChapter);
/**
 * @swagger
 * /api/chapters/{id}:
 *   delete:
 *     summary: Xóa chương
 *     description: Xóa một chương cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của chương cần xóa
 *     responses:
 *       '200':
 *         description: Chương đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chương đã được xóa thành công"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy chương
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.delete('/:id', authenticate, chapterController.deleteChapter);
/**
 * @swagger
 * /api/chapters/list/{comic_id}:
 *   get:
 *     summary: Lấy danh sách chương của truyện tranh
 *     description: Lấy danh sách tất cả các chương của một truyện tranh cụ thể
 *     parameters:
 *       - in: path
 *         name: comic_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của truyện tranh
 *     responses:
 *       '200':
 *         description: Danh sách chương đã được trả về
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
 *                   title:
 *                     type: string
 *                     example: "Chương 1"
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/list/:comic_id', chapterController.getListChapter); // Lấy danh sách chương
/**
 * @swagger
 * /api/chapters/{id}:
 *   get:
 *     summary: Lấy thông tin chương cụ thể
 *     description: Lấy thông tin chi tiết của một chương cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của chương cần lấy thông tin
 *     responses:
 *       '200':
 *         description: Thông tin chương đã được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Chương 1"
 *                 content:
 *                   type: string
 *                   example: "Nội dung của chương 1"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy chương
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:id', authenticate, chapterController.getChapter); // Lấy thông tin chương cụ thể

module.exports = router;
