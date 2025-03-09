const Chapter = require('../models/chapter');
const Comic = require('../models/comic');
const Purchase = require('../models/purchase');

const createChapter = async (req, res) => {
    try {
        const { name, chapter_number, content, comic_id, slug, price } = req.body;

        // Kiểm tra đầu vào hợp lệ
        if (!name || !content || !comic_id || isNaN(chapter_number)) {
            return res.status(400).json({ status: 'error', message: 'Invalid input data' });
        }

        // Tìm truyện theo comic_id
        const comic = await Comic.findByPk(comic_id);

        if (!comic) {
            return res.status(404).json({ status: 'error', message: 'Comic not found' });
        }

        // Kiểm tra quyền (Admin hoặc Chủ sở hữu mới có quyền)
        if (req.user.role_id !== 2 && comic.user_id !== req.user.id) {
            return res.status(403).json({ status: 'error', message: 'You do not have permission to manage this comic' });
        }

        // Tạo chapter
        await Chapter.create({
            name,
            slug,
            chapter_number,
            content,
            comic_id,
            user_id: req.user.id,
            price: price || 0 
        });

        return res.status(200).json({ status: 'success', message: 'Chapter created successfully' });

    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error', error });
    }
};

const updateChapter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, chapter_number, slug, price, content } = req.body;

        // Kiểm tra chapter có tồn tại và thuộc quyền quản lý không
        const chapter = await Chapter.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!chapter) {
            return res.status(404).json({ status: 'error', message: 'Chapter not found or not authorized' });
        }

        // Chỉ cập nhật những trường có giá trị mới
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (chapter_number !== undefined) updateData.chapter_number = chapter_number;
        if (content !== undefined) updateData.content = content;
        if (slug !== undefined) updateData.slug = slug;
        if (price !== undefined) updateData.price = price;

        // Cập nhật chapter
        await chapter.update(updateData);

        return res.status(200).json({ status: 'success', message: 'Chapter updated successfully' });
    } catch (error) {
        console.error('Error updating chapter:', error);
        res.status(500).json({ status: 'error', message: 'Error updating chapter', error });
    }
};

const deleteChapter = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm chapter thuộc quyền quản lý của user
        const chapter = await Chapter.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!chapter) {
            return res.status(404).json({ status: 'error', message: 'Chapter not found or not authorized' });
        }

        // Xóa chapter
        await chapter.destroy();
        return res.status(200).json({ status: 'success', message: 'Chapter deleted successfully' });
    } catch (error) {
        console.error('Error deleting chapter:', error);
        res.status(500).json({ status: 'error', message: 'Error deleting chapter', error });
    }
};

const getChapter = async (req, res) => {
    try {
        const { id } = req.params;
        const chapter = await Chapter.findByPk(id, {
            attributes: ['id', 'name', 'slug', 'price', 'content'],
        });

        if (!chapter) {
            return res.status(404).json({ status: 'error', message: 'Chapter not found' });
        }

        if (chapter.price > 0) {
            if (!req.user) {
                return res.status(401).json({ status: 'error', message: 'You need to log in to access this chapter' });
            }
            const hasPurchased = await Purchase.findOne({
                where: { user_id: req.user.id, chapter_id: id },
            });
            if (!hasPurchased) {
                return res.status(403).json({ status: 'error', message: 'You need to purchase this chapter' });
            }
        }

        res.status(200).json({ status: 'success', data: chapter });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching chapter',error });
    }
};

const getListChapter = async (req, res) => {
    try {
        const { comic_id } = req.params;

        // Tìm danh sách chapter của truyện
        const chapters = await Chapter.findAll({
            where: { comic_id },
            attributes: ['id', 'slug', 'name', 'price','updated_at'], // Chỉ lấy các cột cần thiết
            order: [['chapter_number', 'ASC']], // Sắp xếp theo số chương tăng dần
        });

        return res.status(200).json({ 
            status: 'success', 
            data: chapters 
        });
    } catch (error) {
        console.error('Error fetching chapter list:', error);
        res.status(500).json({ status: 'error', message: 'Lỗi khi lấy danh sách chapter', error });
    }
};

module.exports = { createChapter, updateChapter, deleteChapter,getChapter,getListChapter };