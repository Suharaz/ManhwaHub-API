const Comic = require('../models/comic');
const Chapter = require('../models/chapter');
const Category = require('../models/category');
const Author = require('../models/author');
const Translator = require('../models/translator');
const Vote = require('../models/vote');
const { Sequelize } = require('sequelize');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // Cache sống trong 600 giây (10 phút)

exports.getAllComics = async (req, res) => {
    try {
        let { page = 1, limit = 18 } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        // Đếm tổng số truyện
        const totalComics = await Comic.count({ where: { is_public: 1 } });
        const totalPages = Math.ceil(totalComics / limit);

        // Nếu page vượt quá số trang có sẵn, trả về rỗng
        if (page > totalPages) {
            return res.status(200).json({
                status: 'success',
                data: [],
                pagination: {
                    page,
                    limit,
                    totalComics,
                    totalPages,
                },
            });
        }

        // Kiểm tra cache
        const cacheKey = `comics_page_${page}_limit_${limit}`;
        const cachedComics = cache.get(cacheKey);
        if (cachedComics) {
            return res.status(200).json({
                status: 'success',
                data: cachedComics,
                pagination: {
                    page,
                    limit,
                    totalComics,
                    totalPages,
                },
            });
        }

        // Tính offset để phân trang
        const offset = (page - 1) * limit;

        // Truy vấn danh sách truyện
        const comics = await Comic.findAll({
            where: { is_public: 1 },
            order: [['updated_at', 'DESC']],
            limit,
            offset,
            attributes: ['id', 'name', 'slug', 'thumbnail', 'status', 'updated_at', 'user_id','view_total'],
            include: [{
                model: Chapter,
                attributes: ['id', 'name', 'chapter_number', 'slug'],
                order: [['chapter_number', 'DESC']],
                limit: 3,
            }],
        });

        const plainComics = comics.map(comic => comic.toJSON());

        // Lưu vào cache
        cache.set(cacheKey, plainComics);

        // Truy vấn danh sách truyện phổ biến
        const popularComics = await Comic.findAll({
            where: { is_public: 1 },
            order: [['view_day', 'DESC']],
            limit: 10,
            attributes: ['id', 'name', 'slug', 'thumbnail', 'updated_at'],
        });

        const plainPopularComics = popularComics.map(comic => comic.toJSON());

res.status(200).json({
    status: 'success',
    comicsRecent: plainComics,
    comicsPopular: plainPopularComics,
            status: 'success',
            data: plainComics,
            pagination: {
                page,
                limit,
                totalComics,
                totalPages,
            },
        });
    } catch (error) {
        console.error('Error retrieving comics:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving comics', error });
    }
};


exports.getDetailComic = async (req, res) => {
    const { slug } = req.params;
    try {
        const comic = await Comic.findOne({
            where: { slug },
            attributes: ['id', 'name', 'slug', 'thumbnail', 'status', 'content'],
            include: [
                {
                    model: Chapter,
                    attributes: ['id', 'name', 'chapter_number', 'slug'],
                    order: [['chapter_number', 'DESC']],
                },
                {
                    model: Category,
                    attributes: ['id', 'name', 'slug'],
                    through: { attributes: [] },
                },
                {
                    model: Author,
                    attributes: ['id', 'name', 'slug'],
                    through: { attributes: [] },
                },
                {
                    model: Translator,
                    attributes: ['id', 'name', 'slug'],
                    through: { attributes: [] },
                },
                {
                    model: Vote,
                    attributes: [],
                },
            ],
        });

        if (!comic) {
            return res.status(404).json({ status: 'error', message: 'Comic not found' });
        }

        // Tính votes_avg_value, mặc định là 5 nếu không có vote
        const votesAvg = await Vote.findOne({
            where: { comic_id: comic.id },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('value')), 'votes_avg_value']],
        });
        const votesAvgValue = votesAvg && votesAvg.get('votes_avg_value') ? 
            Math.round(parseFloat(votesAvg.get('votes_avg_value')) * 10) / 10 : 5;

        comic.setDataValue('votes_avg_value', votesAvgValue);

        res.status(200).json({
            status: 'success',
            comic: comic,
        });
    } catch (error) {
        console.error('Error retrieving comic details:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving comic', error });
    }
};

exports.getComicsByList = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 30;
        const offset = (page - 1) * limit;

        const cacheKey = `comics_list_${slug}_page_${page}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                status: 'success',
                data: cachedData,
            });
        }

        let queryOptions = {
            where: { is_public: 1 },
            limit,
            offset,
            attributes: ['id', 'name', 'slug', 'thumbnail', 'status',  'view_total'],
        };

        let title;
        switch (slug) {
            case 'comic-updated':
                queryOptions.order = [['updated_at', 'DESC']];
                title = 'Latest Comics';
                break;
            case 'comic-added':
                queryOptions.order = [['created_at', 'DESC']];
                title = 'New Comics';
                break;
            case 'comic-hot':
                queryOptions.order = [['view_total', 'DESC']];
                title = 'Comic Hot';
                break;
            case 'comic-hot-day':
                queryOptions.order = [['view_day', 'DESC']];
                title = 'Comic Hot Today';
                break;
            case 'comic-hot-week':
                queryOptions.order = [['view_week', 'DESC']];
                title = 'Comic Hot This Week';
                break;
            case 'comic-hot-month':
                queryOptions.order = [['view_month', 'DESC']];
                title = 'Comic Hot This Month';
                break;
            case 'comic-finish':
                queryOptions.where.status = 1;
                queryOptions.order = [['updated_at', 'DESC']];
                title = 'Comic Finish';
                break;
            case 'comic-favorite':
                queryOptions.include.push({
                    model: Follow,
                    attributes: [],
                    duplicating: false,
                });
                queryOptions.subQuery = false;
                queryOptions.group = ['Comic.id'];
                queryOptions.order = [[Sequelize.fn('COUNT', Sequelize.col('Follows.id')), 'DESC']];
                title = 'Comic Favorite';
                break;
            case 'comic-rating':
                queryOptions.include.push({
                    model: Vote,
                    attributes: [],
                    duplicating: false,
                });
                queryOptions.subQuery = false;
                queryOptions.group = ['Comic.id'];
                queryOptions.order = [[Sequelize.fn('COUNT', Sequelize.col('Votes.id')), 'DESC']];
                title = 'Top Rated Comics';
                break;
            default:
                return res.status(404).json({
                    status: 'error',
                    message: 'List type not found!',
                });
        }

        const { count, rows: comics } = await Comic.findAndCountAll(queryOptions);

        // Thêm 3 chapter mới nhất và chuyển thành plain JSON
        const plainComics = [];
        for (let comic of comics) {
            const chapters = await Chapter.findAll({
                where: { comic_id: comic.id },
                attributes: ['id', 'name', 'chapter_number', 'slug'],
                order: [['chapter_number', 'DESC']],
                limit: 3,
            });
            const plainComic = comic.toJSON(); // Chuyển comic thành plain JSON
            plainComic.chapters = chapters.map(ch => ch.toJSON()); // Chuyển chapters thành plain JSON
            plainComics.push(plainComic);
        }

        const totalPages = Math.ceil(count / limit);

        const response = {
            items: plainComics,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: count,
                limit,
            },
            title,
        };

        // Lưu vào cache
        cache.set(cacheKey, response, 600);

        res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        console.error('Error retrieving comics by list:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving comics', error });
    }
};

exports.getComicsByCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 30;
        const offset = (page - 1) * limit;

        const cacheKey = `comics_category_${slug}_page_${page}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                status: 'success',
                data: cachedData,
            });
        }

        const category = await Category.findOne({ where: { slug } });
        if (!category) {
            return res.status(404).json({
                status: 'error',
                message: 'Genre not found!',
            });
        }

        const { count, rows: comics } = await Comic.findAndCountAll({
            where: { is_public: 1 },
            include: [
                { model: Category, where: { id: category.id }, through: { attributes: [] } },
            ],
            order: [['updated_at', 'DESC']],
            limit,
            offset,
            attributes: ['id', 'name', 'slug', 'thumbnail', 'status', 'updated_at'],
        });

        const plainComics = [];
        for (let comic of comics) {
            const chapters = await Chapter.findAll({
                where: { comic_id: comic.id },
                attributes: ['id', 'name', 'chapter_number', 'slug'],
                order: [['chapter_number', 'DESC']],
                limit: 3,
            });
            const plainComic = comic.toJSON();
            plainComic.chapters = chapters.map(ch => ch.toJSON());
            plainComics.push(plainComic);
        }

        const totalPages = Math.ceil(count / limit);

        const response = {
            items: plainComics,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: count,
                limit,
            },
            title: category.name,
        };

        cache.set(cacheKey, response, 6000);

        res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        console.error('Error retrieving comics by category:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving comics', error });
    }
};

exports.getComicsByAuthor = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 30;
        const offset = (page - 1) * limit;

        const cacheKey = `comics_author_${slug}_page_${page}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                status: 'success',
                data: cachedData,
            });
        }

        const author = await Author.findOne({ where: { slug } });
        if (!author) {
            return res.status(404).json({
                status: 'error',
                message: 'Author not found!',
            });
        }

        const { count, rows: comics } = await Comic.findAndCountAll({
            where: { is_public: 1 },
            include: [ { model: Author, where: { id: author.id }, through: { attributes: [] } },],
            order: [['updated_at', 'DESC']],
            limit,
            offset,
            attributes: ['id', 'name', 'slug', 'thumbnail', 'status', 'updated_at'],
        });

        const plainComics = [];
        for (let comic of comics) {
            const chapters = await Chapter.findAll({
                where: { comic_id: comic.id },
                attributes: ['id', 'name', 'chapter_number', 'slug'],
                order: [['chapter_number', 'DESC']],
                limit: 3,
            });
            const plainComic = comic.toJSON();
            plainComic.chapters = chapters.map(ch => ch.toJSON());
            plainComics.push(plainComic);
        }

        const totalPages = Math.ceil(count / limit);

        const response = {
            items: plainComics,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: count,
                limit,
            },
            title: author.name,
        };

        cache.set(cacheKey, response, 6000);

        res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        console.error('Error retrieving comics by author:', error);
        res.status(500).json({ status: 'error', message: 'Error retrieving comics', error });
    }
};

exports.search = async (req, res) => {
    try {
        const { keyword, page = 1 } = req.query;
        const limit = 30;
        const offset = (parseInt(page) - 1) * limit;

        // Kiểm tra keyword
        if (!keyword) {
            return res.status(400).json({
                status: 'error',
                message: 'Keyword is required.',
            });
        }

        // Tạo slug từ keyword
        const slugKeyword = keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        // Tìm kiếm comics với phân trang
        const { count, rows: comics } = await Comic.findAndCountAll({
            where: {
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.like]: `%${keyword}%` } },
                    { origin_name: { [Sequelize.Op.like]: `%${keyword}%` } },
                    { slug: { [Sequelize.Op.like]: `%${slugKeyword}%` } },
                ],
            },
            attributes: ['id', 'name', 'slug', 'thumbnail', 'status', 'origin_name'],
            limit,
            offset,
        });

        // Thêm lastChapter cho mỗi comic và chuyển thành plain JSON
        const plainComics = [];
        for (let comic of comics) {
            const lastChapter = await Chapter.findOne({
                where: { comic_id: comic.id },
                attributes: ['id', 'name', 'chapter_number', 'slug'],
                order: [['chapter_number', 'DESC']],
            });
            const plainComic = comic.toJSON();
            plainComic.lastChapter = lastChapter ? lastChapter.toJSON() : null;
            plainComics.push(plainComic);
        }

        const totalPages = Math.ceil(count / limit);

        const response = {
            items: plainComics,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: count,
                limit,
            },
        };

        res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        console.error('Error searching comics:', error);
        res.status(500).json({ status: 'error', message: 'Error searching comics', error });
    }
};
