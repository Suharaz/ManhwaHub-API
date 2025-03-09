const Notification = require('../models/notifications');

exports.getNotiByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
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
    const { id } = req.params;
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }
    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    await notification.update({ status: 1 });
    res.status(200).json({
      message: 'Thông báo đã được đánh dấu là đã đọc',
      notification: {
        id: notification.id,
        userId: notification.userId,
        title: notification.title,
        content: notification.content,
        read: notification.status
      }
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
