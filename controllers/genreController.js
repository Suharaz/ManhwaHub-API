const Category  = require('../models/category');

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Category.findAll();

    if (!genres.length) {
      return res.status(404).json({ message: 'Không có thể loại nào' });
    }

    res.status(200).json(genres);
  } catch (error) {
    console.error('Lỗi khi lấy thể loại:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
  }
};
const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .toLowerCase()
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu '-'
    .replace(/[^\w-]+/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/--+/g, '-') // Loại bỏ dấu '--' lặp
    .trim();
};

exports.createGenre = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Tên thể loại là bắt buộc' });
    }

    const genreSlug = slug || slugify(name);

    const existingGenre = await Category.findOne({ where: { slug: genreSlug } });
    if (existingGenre) {
      return res.status(409).json({ message: 'Thể loại đã tồn tại' });
    }

    const newGenre = await Category.create({ name, slug: genreSlug });

    res.status(201).json({
      message: 'Thể loại đã được thêm thành công',
      genre: { id: newGenre.id, name: newGenre.name, slug: newGenre.slug }
    });
  } catch (error) {
    console.error('Lỗi khi tạo thể loại:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Tên thể loại là bắt buộc' });
    }

    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này', });
    }

    // Tìm thể loại cần cập nhật
    const genre = await Category.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: 'Không tìm thấy thể loại' });
    }

    // Xử lý slug: nếu có thì dùng, nếu không có thì tạo từ name
    const newSlug = slug || slugify(name);

    // Kiểm tra slug có bị trùng không (trừ chính nó)
    const existingGenre = await Category.findOne({ where: { slug: newSlug, id: { $ne: id } } });
    if (existingGenre) {
      return res.status(409).json({ message: 'Slug đã tồn tại, vui lòng chọn slug khác' });
    }

    // Cập nhật thể loại
    await genre.update({ name, slug: newSlug });

    res.status(200).json({
      message: 'Thể loại đã được cập nhật thành công',
      genre: { id: genre.id, name: genre.name, slug: genre.slug }
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật thể loại:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
  }
};


exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Category.findByPk(id);
    if (!genre) {
      return res.status(404).json({ message: 'Không tìm thấy thể loại' });
    }
    if (req.user.role_id !== 2) {
      return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này' });
    }
    await genre.destroy();
    res.status(200).json({ message: 'Thể loại đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};
