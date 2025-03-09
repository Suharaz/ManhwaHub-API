const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const authenticate = require('../middleware/auth');
/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Lấy danh sách các thể loại
 *     description: Trả về danh sách tất cả các thể loại
 *     responses:
 *       '200':
 *         description: Danh sách các thể loại
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Hành động"
 */
router.get('/', genreController.getAllGenres);

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Thêm thể loại mới
 *     description: Chỉ admin (role = 2) có thể thêm thể loại mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên thể loại
 *                 example: "Hành động"
 *     responses:
 *       '201':
 *         description: Thể loại đã được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thể loại đã được thêm thành công"
 *                 genre:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Hành động"
 *       '401':
 *         description: Không có quyền truy cập
 *       '400':
 *         description: Yêu cầu không hợp lệ
 */
router.post('/', authenticate, genreController.createGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     summary: Cập nhật thể loại
 *     description: Chỉ admin (role = 2) có thể cập nhật thể loại
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID của thể loại cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên thể loại mới
 *                 example: "Hành động mới"
 *     responses:
 *       '200':
 *         description: Thể loại đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thể loại đã được cập nhật thành công"
 *                 genre:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Hành động mới"
 *       '401':
 *         description: Không có quyền truy cập
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '404':
 *         description: Không tìm thấy thể loại
 */
router.put('/:id', authenticate, genreController.updateGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Xóa thể loại
 *     description: Chỉ admin (role = 2) có thể xóa thể loại
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID của thể loại cần xóa
 *     responses:
 *       '200':
 *         description: Thể loại đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thể loại đã được xóa thành công"
 *       '401':
 *         description: Không có quyền truy cập
 *       '404':
 *         description: Không tìm thấy thể loại
 */
router.delete('/:id', authenticate,genreController.deleteGenre);

module.exports = router;
