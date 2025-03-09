const express = require('express');
const router = express.Router();
const notiController = require('../controllers/notiController');
const authenticate = require('../middleware/auth');

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Lấy danh sách thông báo của user
 *     description: Trả về danh sách thông báo của người dùng
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Danh sách thông báo
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
 *                   userId:
 *                     type: number
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Thông báo mới"
 *                   content:
 *                     type: string
 *                     example: "Bạn có thông báo mới"
 *                   read:
 *                     type: boolean
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-03-08T10:15:30Z"
 *       '401':
 *         description: Không có quyền truy cập
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/', authenticate, notiController.getNotiByUser);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Tạo thông báo mới
 *     description: Chỉ admin hoặc hệ thống có thể tạo thông báo mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: ID của người dùng nhận thông báo
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Tiêu đề thông báo
 *                 example: "Thông báo mới"
 *               content:
 *                 type: string
 *                 description: Nội dung thông báo
 *                 example: "Bạn có thông báo mới"
 *     responses:
 *       '201':
 *         description: Thông báo đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thông báo đã được tạo thành công"
 *                 notification:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Thông báo mới"
 *                     content:
 *                       type: string
 *                       example: "Bạn có thông báo mới"
 *                     read:
 *                       type: boolean
 *                       example: false
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '401':
 *         description: Không có quyền truy cập
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/', authenticate, notiController.createNoti);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Đánh dấu thông báo là đã đọc
 *     description: Đánh dấu thông báo là đã đọc
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID của thông báo cần đánh dấu là đã đọc
 *     responses:
 *       '200':
 *         description: Thông báo đã được đánh dấu là đã đọc
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thông báo đã được đánh dấu là đã đọc"
 *                 notification:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Thông báo mới"
 *                     content:
 *                       type: string
 *                       example: "Bạn có thông báo mới"
 *                     read:
 *                       type: boolean
 *                       example: true
 *       '401':
 *         description: Không có quyền truy cập
 *       '404':
 *         description: Không tìm thấy thông báo
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.put('/:id/read', authenticate, notiController.markNotificationAsRead);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Xóa một thông báo
 *     description: Xóa một thông báo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID của thông báo cần xóa
 *     responses:
 *       '200':
 *         description: Thông báo đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thông báo đã được xóa thành công"
 *       '401':
 *         description: Không có quyền truy cập
 *       '404':
 *         description: Không tìm thấy thông báo
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.delete('/:id', authenticate, notiController.deleteNotification);

module.exports = router;
