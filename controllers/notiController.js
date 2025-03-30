const Notification = require('../models/notifications');

exports.getNotiByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 5 } = req.query; // Mặc định page = 1, limit = 5

    const offset = (page - 1) * limit;

    // Lấy danh sách thông báo có phân trang
    const { count, rows: notifications } = await Notification.findAndCountAll({
      where: { userId },
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Đếm số thông báo chưa đọc (status = 0 hoặc false)
    const totalUnread = await Notification.count({
      where: { userId, status: 0 }
    });

    res.status(200).json({
      total: count,
      totalUnread, // Số thông báo chưa đọc
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit),
      notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};



exports.createNoti = async (req, res) => {
  try {
    const { userId, title, content, type = null, link = null } = req.body;

    // Kiểm tra thông tin bắt buộc
    if (!userId || !title || !content) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    // Tạo thông báo mới
    const newNotification = await Notification.create({
      userId,
      title,
      content,
      type, // Chỉ thêm nếu có
      link, // Chỉ thêm nếu có
      read: false
    });

    res.status(201).json({
      message: 'Thông báo đã được tạo thành công',
      notification: newNotification
    });
  } catch (error) {
    console.error('Lỗi khi tạo thông báo:', error);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
  }
};


exports.markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ request (đã xác thực)

    // Cập nhật tất cả thông báo có userId này
    const [updatedCount] = await Notification.update(
      { status: 1 }, 
      { where: { userId } }
    );
    res.status(200).json({
      message: 'Tất cả thông báo đã được đánh dấu là đã đọc',
      updatedCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }
    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    await notification.destroy();
    res.status(200).json({ message: 'Thông báo đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
  }
};
