const User = require('../models/user');
const Comic = require('../models/comic');
const Follow = require('../models/follow');
const Comment = require('../models/comments');
const Chapter = require('../models/chapter');
const History = require('../models/histories');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');

const getInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: [
                'id', 'name', 'email',  'exp', 'avatar', 
                // 'total_point'
               ]
        });
  
        if (!user) {
            return res.status(404).json({ message: "User not found", });
        }
  
        // Trả về thông tin user
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                exp: user.exp,
                avatar: user.avatar,
                total_point: user.total_point
            }
        });
    } catch (error) {
        console.error("Get Me Error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, avatar } = req.body;

    // Kiểm tra quyền truy cập
    if (req.user.id !== parseInt(id) && req.user.role_id !== 2) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Tạo đối tượng dữ liệu cần cập nhật
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.password = bcrypt.hashSync(password, 10);
    if (avatar) updatedData.avatar = avatar;

    // Cập nhật user bằng Sequelize `update()`
    const [updated] = await User.update(updatedData, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update User Error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
    try {
      
      if (req.user.role_id !== 2) {
        return res.status(403).json({ message: "Only admin can delete users" });
      }
      if (parseInt(req.params.id) === req.user.id) {
        return res.status(400).json({ message: "Admin cannot delete their own account" });
      }
      const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      await User.update({ status: 0 }, { where: { id: req.params.id } });
      res.json({ message: "User deleted successfully" });

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
};
  
const getFollowByUser = async (req, res) => {
  try {
      const userId = req.user.id; // Lấy ID user từ token
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15;
      const offset = (page - 1) * limit;

      
      // Lấy danh sách truyện đã theo dõi + chương mới nhất
      const { rows: follows, count: total } = await Follow.findAndCountAll({
          where: { user_id: userId },
          include: [{
              model: Comic,
              attributes: ['id', 'name', 'thumbnail'],
              include: [{
                  model: Chapter,
                  attributes: ['id', 'chapter_number'],
                  order: [['chapter_number', 'DESC']],
                  limit: 1,
                  separate: true // Đảm bảo lấy đúng 1 chapter mới nhất
              }]
          }],
          order: [['updated_at', 'DESC']],
          limit,
          offset
      });

      // Chuẩn bị dữ liệu trả về
      const response = {
          status: "success",
          follows: follows.map(follow => ({
              comic: follow.Comic
          })),
          pagination: {
              total,
              page,
              limit,
              totalPages: Math.ceil(total / limit)
          }
      };

      res.json(response);
  } catch (error) {
      console.error("Get Followed Comics Error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const getHistoryByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await History.findAll({
      where: { user_id: userId },
      include: [{
        model: Comic,
        as: 'comic'
      }],
      order: [['updated_at', 'DESC']],
    });

    res.status(200).json({ success: true, data: { readingHistory: history } });
  } catch (error) {
    console.error('Get Reading History Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const saveHistory = async (req, res) => {
  try {
    const { comicId, chapterId } = req.body;
    const userId = req.user.id;
    if (!userId || !comicId || !chapterId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let existingHistory = await History.findOne({
      where: { user_id: userId, comic_id: comicId }
    });
    if (existingHistory) {
      // Chuyển list_chapter từ TEXT -> Mảng JSON
      let listChapter = [];
      if (existingHistory.list_chapter) {
        try {
          listChapter = JSON.parse(existingHistory.list_chapter);
        } catch (error) {
          console.error("Error parsing list_chapter:", error);
        }
      }

      // Nếu chapter chưa có trong danh sách, thêm vào
      if (!listChapter.includes(chapterId)) {
        listChapter.push(chapterId);
      }

      // Cập nhật history
      await existingHistory.update({
        list_chapter: JSON.stringify(listChapter), // Chuyển lại thành TEXT
        updated_at: new Date()
      });
    } else {
      
      await History.create({
        user_id: userId,
        comic_id: comicId,
        chapter_id: chapterId,
        list_chapter: JSON.stringify([chapterId]) 
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Save Reading History Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { 
  getInfo,
  updateUser, 
  deleteUser, 
  getFollowByUser, 
  getHistoryByUser,
  saveHistory
};
