const Chapter = require('../models/chapter');
const Comic = require('../models/comic');
const User = require('../models/user');
const Translator = require('../models/translator');
const Vote = require('../models/vote');
const Follow=require('../models/follow');
const { Sequelize } = require('sequelize');
const moment = require('moment');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

exports.createComic = async (req, res) => {
    try {
        const allowedRoles = [1, 2]; // Tác giả (1) và admin (2)
        if (!req.user || !allowedRoles.includes(req.user.role_id)) {
            return res.status(403).json({
                status: 'error',
                message: 'Permission denied. Only admins and authors can create comics.',
            });
        }

        const { name, slug, thumbnail, content, status, is_public, authorIds, translatorIds, categoryIds } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!name || !slug) {
            return res.status(400).json({
                status: 'error',
                message: 'Name and slug are required.',
            });
        }

        // Kiểm tra slug trùng lặp
        const existingComic = await Comic.findOne({ where: { slug } });
        if (existingComic) {
            return res.status(400).json({
                status: 'error',
                message: 'Slug already exists.',
            });
        }

        // Tạo comic mới
        const comic = await Comic.create({
            name,
            slug,
            thumbnail: thumbnail || null,
            content: content || null,
            status: status !== undefined ? status : 0,
            is_public: is_public !== undefined ? is_public : 0,
            user_id: req.user.id,
        });

        // Gán các mối quan hệ (nếu có)
        if (authorIds && Array.isArray(authorIds)) {
            await comic.setAuthors(authorIds);
        }
        if (translatorIds && Array.isArray(translatorIds)) {
            await comic.setTranslators(translatorIds);
        }
        if (categoryIds && Array.isArray(categoryIds)) {
            await comic.setCategories(categoryIds);
        }

        // Xóa cache
        cache.del('comics_recent');

        // Trả về thông báo thành công đơn giản
        res.status(201).json({
            status: 'success',
            message: 'Comic created successfully',
            data: { id: comic.id, slug: comic.slug } // Chỉ trả về ID và slug cơ bản
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error creating comic', error });
    }
};

exports.updateComic = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug: newSlug, thumbnail, content, status, is_public, authorIds, translatorIds, categoryIds } = req.body;

        if (req.user.role_id !== 2 && comic.user_id !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Permission denied. You can only update your own comics.',
            });
        }

        const comic = await Comic.findOne({ where: { id } });
        if (!comic) {
            return res.status(404).json({
                status: 'error',
                message: 'Comic not found',
            });
        }

       
        // Cập nhật thông tin cơ bản
        const updatedData = {};
        if (name !== undefined) updatedData.name = name;
        if (newSlug !== undefined) updatedData.slug = newSlug; // Dùng newSlug để tránh nhầm với param slug
        if (thumbnail !== undefined) updatedData.thumbnail = thumbnail;
        if (content !== undefined) updatedData.content = content;
        if (status !== undefined) updatedData.status = status;
        if (is_public !== undefined) updatedData.is_public = is_public;

        await comic.update(updatedData);

        // Cập nhật quan hệ (nếu có)
        if (authorIds && Array.isArray(authorIds)) {
            await comic.setAuthors(authorIds);
        }
        if (translatorIds && Array.isArray(translatorIds)) {
            await comic.setTranslators(translatorIds);
        }
        if (categoryIds && Array.isArray(categoryIds)) {
            await comic.setCategories(categoryIds);
        }

        
        cache.del('comics_recent');
        res.status(200).json({
            status: 'success',
            message: 'Comic updated successfully'
        });
    } catch (error) {
        console.error('Error updating comic:', error);
        res.status(500).json({ status: 'error', message: 'Error updating comic', error });
    }
};

exports.deleteComic = async (req, res) => {
    try {
        const { id } = req.params;

        // Admin (role_id = 2) có thể xóa tất cả, tác giả (role_id = 1) chỉ xóa của mình
        if (req.user.role_id !== 2 && comic.user_id !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Permission denied. You can only delete your own comics.',
            });
        }

        const comic = await Comic.findOne({ where: { id } });
        if (!comic) {
            return res.status(404).json({
                status: 'error',
                message: 'Comic not found',
            });
        }

        

        // Xóa các bản ghi liên quan
        await comic.setAuthors([]);
        await comic.setTranslators([]);
        await comic.setCategories([]);
        await Chapter.destroy({ where: { comic_id: comic.id } });
        await Vote.destroy({ where: { comic_id: comic.id } });

        // Xóa comic
        await comic.destroy();

        // Xóa cache
        cache.del('comics_recent');

        res.status(200).json({
            status: 'success',
            message: 'Comic and related data deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting comic:', error);
        res.status(500).json({ status: 'error', message: 'Error deleting comic', error });
    }
};

exports.followComic = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid comic ID' });
        }
        const [follow, created] = await Follow.findOrCreate({
            where: { user_id: req.user.id, comic_id: id },
            defaults: { user_id: req.user.id, comic_id: id }
        });

        if (!created) {
            return res.status(400).json({
                status: 'error',
                message: 'You are already following this comic',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Comic followed successfully',
        });
    } catch (error) {
        console.error('Error following comic:', error);
        
        // Phân loại lỗi rõ hơn
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ status: 'error', message: 'Database error', error });
        }
        
        res.status(500).json({ status: 'error', message: 'Internal server error', error });
    }
};

exports.unfollowComic = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra ID có hợp lệ không
        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid comic ID' });
        }

        // Kiểm tra xem user có theo dõi comic này không
        const follow = await Follow.findOne({
            where: { user_id: req.user.id, comic_id: id }
        });

        if (!follow) {
            return res.status(400).json({
                status: 'error',
                message: 'bạn chưa theo dõi truyện này',
            });
        }

        // Xóa bản ghi theo dõi
        await follow.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Bỏ theo dõi truyện thành công',
        });
    } catch (error) {
        console.error('Error unfollowing comic:', error);

        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ status: 'error', message: 'Database error', error });
        }

        res.status(500).json({ status: 'error', message: 'Internal server error', error });
    }
};

exports.rateComic = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, content } = req.body;

        // Kiểm tra ID hợp lệ
        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 'error', message: 'Invalid comic ID' });
        }

        // Kiểm tra giá trị rating hợp lệ
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                status: 'error',
                message: 'Rating must be between 1 and 5',
            });
        }

        // Kiểm tra content nếu model yêu cầu
        if (!content || content.trim() === '') {
            return res.status(400).json({
                status: 'error',
                message: 'Content is required',
            });
        }

        // Kiểm tra comic có tồn tại không
        const comic = await Comic.findByPk(id);
        if (!comic) {
            return res.status(404).json({
                status: 'error',
                message: 'Comic not found',
            });
        }

        // Cập nhật hoặc tạo mới đánh giá
        const [vote, created] = await Vote.findOrCreate({
            where: { user_id: req.user.id, comic_id: id },
            defaults: { user_id: req.user.id, comic_id: id, value: rating, content }
        });

        if (!created) {
            await vote.update({ value: rating, content });
        }

        res.status(200).json({
            status: 'success',
            message: 'Comic rated successfully',
        });
    } catch (error) {
        console.error('Error rating comic:', error);

        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ status: 'error', message: 'Database error', error });
        }

        res.status(500).json({ status: 'error', message: 'Internal server error', error });
    }
};

exports.getRatingByComic = async (req, res) => {
    try {
        const { id } = req.params;
        let { page = 1, limit = 10 } = req.query;

        if (isNaN(id) || isNaN(page) || isNaN(limit)) {
            return res.status(400).json({ status: 'error', message: 'Invalid parameters' });
        }

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        // Lấy tổng số đánh giá để tính tổng số trang
        const totalRatings = await Vote.count({
            where: { comic_id: id }
        });

        const totalPages = Math.ceil(totalRatings / limit);

        // Lấy danh sách đánh giá có phân trang
        const ratings = await Vote.findAll({
            where: { comic_id: id },
            attributes: ['id', 'content', 'value', 'user_id', 'updated_at','user_id'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'avatar'] 
                }
            ],
            order: [['created_at', 'DESC']],
            limit,
            offset
        });
      
        res.status(200).json({
            status: 'success',
            data: ratings,
            meta: {
                currentPage: page,
                totalPages,
                totalRatings
            }
        });
    } catch (error) {
        console.error('Error getting ratings:', error);
        res.status(500).json({ status: 'error', message: 'Error getting ratings', error });
    }
};

exports.upViewComic = async (req, res) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findByPk(id);

        if (!comic) {
            return res.status(404).json({ status: 'error', message: 'Comic not found' });
        }

        // Lấy ngày hiện tại, ngày đầu tuần, ngày đầu tháng
        const today = moment().format('YYYY-MM-DD');
        const firstDayOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
        const firstDayOfMonth = moment().startOf('month').format('YYYY-MM-DD');

        // Kiểm tra lần cuối cập nhật
        const lastViewedDate = moment(comic.upview_at).format('YYYY-MM-DD');

        // Các field cần update
        const updateFields = {};

        // Tổng lượt xem +1
        updateFields.view_total = comic.view_total + 1;

        // View theo ngày
        if (lastViewedDate !== today) {
            updateFields.view_day = 1;
        } else {
            updateFields.view_day = comic.view_day + 1;
        }

        // View theo tuần
        if (moment(comic.upview_at).isBefore(firstDayOfWeek)) {
            updateFields.view_week = 1;
        } else {
            updateFields.view_week = comic.view_week + 1;
        }

        // View theo tháng
        if (moment(comic.upview_at).isBefore(firstDayOfMonth)) {
            updateFields.view_month = 1;
        } else {
            updateFields.view_month = comic.view_month + 1;
        }

        // Cập nhật thời gian xem cuối cùng
        updateFields.upview_at = new Date();

        // Cập nhật tất cả chỉ trong 1 câu SQL, không đụng updated_at
        await Comic.update(updateFields, {
            where: { id },
            silent: true
        });

        return res.status(200).json({ status: 'success', message: 'View count updated' });

    } catch (error) {
        console.error('Error updating view count:', error);
        return res.status(500).json({ status: 'error', message: 'Error updating view count', error });
    }
};


