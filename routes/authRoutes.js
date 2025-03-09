const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/auth');
// Existing routes
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập vào ứng dụng
 *     description: Xác thực người dùng và trả về mã JWT cùng với thông tin người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Địa chỉ email của người dùng
 *               password:
 *                 type: string
 *                 description: Mật khẩu của người dùng
 *               remember:
 *                 type: boolean
 *                 description: Có nhớ người dùng hay không
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập thành công"
 *                 jwt_token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Người dùng A"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: number
 *                       example: 0
 *                     exp:
 *                       type: number
 *                       example: 100
 *                     avatar:
 *                       type: string
 *                       example: "url/to/avatar.jpg"
 *                     total_point:
 *                       type: number
 *                       example: 500
 *       '401':
 *         description: Thông tin đăng nhập không hợp lệ
 *       '404':
 *         description: Không tìm thấy người dùng
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên người dùng
 *               email:
 *                 type: string
 *                 description: Địa chỉ email của người dùng
 *               password:
 *                 type: string
 *                 description: Mật khẩu của người dùng
 *     responses:
 *       '201':
 *         description: Đăng ký người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng ký người dùng thành công!"
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thiếu trường, email không hợp lệ, mật khẩu quá ngắn"
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất khỏi ứng dụng
 *     description: Xóa phiên làm việc của người dùng
 *     responses:
 *       '200':
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng xuất thành công"
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Làm mới mã JWT
 *     description: Sử dụng mã làm mới để lấy mã JWT mới
 *     responses:
 *       '200':
 *         description: Mã JWT mới đã được phát hành
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 new_jwt:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Mã làm mới không hợp lệ
 */
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
