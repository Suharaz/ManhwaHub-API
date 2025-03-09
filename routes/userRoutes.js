const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/auth');

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     description: Lấy thông tin chi tiết của một người dùng cụ thể
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       '200':
 *         description: Thông tin người dùng đã được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Người dùng A"
 *       '404':
 *         description: Không tìm thấy người dùng
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:id', userController.getInfo);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     description: Cập nhật thông tin của một người dùng cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên mới của người dùng
 *               email:
 *                 type: string
 *                 description: Địa chỉ email mới của người dùng
 *     responses:
 *       '200':
 *         description: Thông tin người dùng đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thông tin người dùng đã được cập nhật thành công"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy người dùng
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/:id', authenticate, userController.updateUser);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: Xóa một người dùng cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần xóa
 *     responses:
 *       '200':
 *         description: Người dùng đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Người dùng đã được xóa thành công"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy người dùng
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.delete('/:id',authenticate,userController.deleteUser);
/**
 * @swagger
 * /api/users/{id}/followed-comics:
 *   get:
 *     summary: Lấy danh sách truyện tranh đã theo dõi
 *     description: Lấy danh sách tất cả các truyện tranh mà người dùng đã theo dõi
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       '200':
 *         description: Danh sách truyện tranh đã được trả về
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
 *                     example: "Truyện tranh A"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy người dùng
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:id/followed-comics',authenticate, userController.getFollowByUser);
/**
 * @swagger
 * /api/users/{id}/history:
 *   get:
 *     summary: Lấy lịch sử đọc truyện tranh
 *     description: Lấy lịch sử đọc truyện tranh của một người dùng cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       '200':
 *         description: Lịch sử đọc truyện tranh đã được trả về
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   comic_id:
 *                     type: string
 *                     example: "1"
 *                   chapter_id:
 *                     type: string
 *                     example: "1"
 *                   read_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-03-08T18:13:24Z"
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy người dùng
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:id/history',authenticate, userController.getHistoryByUser);
/**
 * @swagger
 * /api/users/{id}/history:
 *   post:
 *     summary: Lưu lịch sử đọc truyện tranh
 *     description: Lưu lịch sử đọc truyện tranh của một người dùng cụ thể
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
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
 *               chapter_id:
 *                 type: string
 *                 description: ID của chương
 *     responses:
 *       '201':
 *         description: Lịch sử đọc truyện tranh đã được lưu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lịch sử đọc truyện tranh đã được lưu thành công"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không được phép truy cập
 *       '404':
 *         description: Không tìm thấy người dùng
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/:id/history',authenticate, userController.saveHistory);
module.exports = router;
