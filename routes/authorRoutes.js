const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Lấy danh sách tác giả
 *     description: Lấy danh sách tất cả các tác giả
 *     responses:
 *       '200':
 *         description: Danh sách tác giả đã được trả về
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
 *                   name:
 *                     type: string
 *                     example: "Tác giả A"
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/', authorController.getAllAuthors);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Lấy thông tin tác giả theo ID
 *     description: Lấy thông tin chi tiết của một tác giả dựa trên ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của tác giả
 *     responses:
 *       '200':
 *         description: Thông tin tác giả đã được trả về
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
 *                   example: "Tác giả A"
 *       '404':
 *         description: Không tìm thấy tác giả
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:id', authorController.getAuthorById);

module.exports = router;
