const express = require('express');
const router = express.Router();
const comicController = require('../controllers/homeController');
/**
 * @swagger
 * /api/home:
 *   get:
 *     summary: Lấy danh sách tất cả truyện tranh
 *     description: Lấy danh sách tất cả các truyện tranh có sẵn
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
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
// Route to get all comics
router.get('/', comicController.getAllComics);
/**
 * @swagger
 * /api/home/search:
 *   get:
 *     summary: Tìm kiếm truyện tranh
 *     description: Tìm kiếm truyện tranh dựa trên từ khóa
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       '200':
 *         description: Kết quả tìm kiếm đã được trả về
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
 *       '400':
 *         description: Yêu cầu không hợp lệ
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/search', comicController.search);
/**
 * @swagger
 * /api/home/{slug}:
 *   get:
 *     summary: Lấy thông tin chi tiết truyện tranh
 *     description: Lấy thông tin chi tiết của một truyện tranh dựa trên slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của truyện tranh
 *     responses:
 *       '200':
 *         description: Thông tin chi tiết truyện tranh đã được trả về
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
 *                   example: "Truyện tranh A"
 *                 description:
 *                   type: string
 *                   example: "Mô tả của truyện tranh A"
 *       '404':
 *         description: Không tìm thấy truyện tranh
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/:slug', comicController.getDetailComic);
/**
 * @swagger
 * /api/home/list/{slug}:
 *   get:
 *     summary: Lấy danh sách truyện tranh theo danh sách
 *     description: Lấy danh sách truyện tranh thuộc một danh sách cụ thể
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của danh sách
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
 *       '404':
 *         description: Không tìm thấy danh sách
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/list/:slug', comicController.getComicsByList); 
/**
 * @swagger
 * /api/home/category/{slug}:
 *   get:
 *     summary: Lấy danh sách truyện tranh theo thể loại
 *     description: Lấy danh sách truyện tranh thuộc một thể loại cụ thể
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của thể loại
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
 *       '404':
 *         description: Không tìm thấy thể loại
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/category/:slug', comicController.getComicsByCategory);
/**
 * @swagger
 * /api/home/author/{slug}:
 *   get:
 *     summary: Lấy danh sách truyện tranh theo tác giả
 *     description: Lấy danh sách truyện tranh của một tác giả cụ thể
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của tác giả
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
 *       '404':
 *         description: Không tìm thấy tác giả
 *       '500':
 *         description: Lỗi máy chủ nội bộ
 */
router.get('/author/:slug', comicController.getComicsByAuthor); 



module.exports = router;
