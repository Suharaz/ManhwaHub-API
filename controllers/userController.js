const User = require('../models/user');
const Comic = require('../models/comic');
const Follow = require('../models/follow');
const Chapter = require('../models/chapter');
const History = require('../models/histories');
const Comment = require('../models/comments');
const bcrypt = require('bcryptjs');
const  Transaction  = require('../models/transaction');
const Purchase = require('../models/purchase');

const getInfo = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: [
                'id', 'name', 'email',  'exp', 'avatar', 
                'total_point'
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
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }

    const { id } = req.params;
    let { name, email, password, role_id } = req.body;
    if (req.user.id !== parseInt(id) && req.user.role_id !== 2) {
      return res.status(403).json({ message: "Access denied" });
    }
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== parseInt(id)) {
        return res.status(400).json({ message: "Email already exists" });
      }
      updatedData.email = email;
    }
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (role_id !== undefined) {
      if (req.user.role_id === 2) {
        updatedData.role_id = role_id;
      } else {
        return res.status(403).json({ message: "You do not have permission to update role_id" });
      }
    }
    if (req.file) {
      updatedData.avatar = `/uploads/avatars/${req.file.filename}`;
    }
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    const [updated] = await User.update(updatedData, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar', 'role_id']
    });

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteUser = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
      }
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
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
      }
      const userId = req.user.id; // Lấy ID user từ token
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15;
      const offset = (page - 1) * limit;

      
      // Lấy danh sách truyện đã theo dõi + chương mới nhất
      const { rows: follows, count: total } = await Follow.findAndCountAll({
          where: { user_id: userId },
          include: [{
              model: Comic,
              attributes: ['id', 'name', 'thumbnail', 'slug', 'updated_at'],
              order: [['updated_at', 'DESC']],
              include: [{
                  model: Chapter,
                  attributes: ['id', 'chapter_number','updated_at'],
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
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }
    const userId = req.user.id;

    const history = await History.findAll({
      where: { user_id: userId },
      include: [{
        model: Comic,
        as: 'comic'
      }],
      order: [['updated_at', 'DESC']],
    });

const total = await History.count({ where: { user_id: userId } });
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const totalPages = Math.ceil(total / limit);

res.status(200).json({ 
  success: true, 
  data: { 
    readingHistory: history,
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  } 
});
  } catch (error) {
    console.error('Get Reading History Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const getCommentByUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }

    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Lấy comment có phân trang
    const comments = await Comment.findAll({
      where: { user_id: userId },
      attributes: ['id', 'user_id', 'comic_id', 'chapter_id', 'content', 'parent_id', 'created_at', 'updated_at'],
      include: [{
        model: Comic,
        attributes: ['name', 'thumbnail', 'slug']
      }],
      order: [['updated_at', 'DESC']],
      limit,
      offset
    });

    // Tổng số comment
    const total = await Comment.count({ where: { user_id: userId } });
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: {
        comments,
        pagination: {
          total,
          page,
          limit,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get Comment History Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const saveHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }

    const { comicId, chapterId } = req.body;
    const userId = req.user.id;

    if (!userId || !comicId || !chapterId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Kiểm tra xem đã có bản ghi chưa
    let existingHistory = await History.findOne({
      where: { user_id: userId, comic_id: comicId }
    });

    let listChapter = [];

    if (existingHistory) {
      // Chuyển list_chapter từ TEXT -> Mảng JSON
      if (existingHistory.list_chapter) {
        try {
          listChapter = JSON.parse(existingHistory.list_chapter);
        } catch (error) {
          console.error("Error parsing list_chapter:", error);
        }
      }
    }

    // Thêm chapter mới vào danh sách (nếu chưa có)
    if (!listChapter.includes(chapterId)) {
      listChapter.push(chapterId);
    }

    // Loại bỏ trùng lặp (nếu có) và chuyển thành JSON string
    listChapter = [...new Set(listChapter)];

    // Sử dụng upsert để đảm bảo không có dòng nào trùng `comic_id` và `user_id`
    await History.upsert({
      user_id: userId,
      comic_id: comicId,
      chapter_id: chapterId,
      list_chapter: JSON.stringify(listChapter), // Chuyển lại thành TEXT
      updated_at: new Date()
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Save Reading History Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const buyChapter = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
  }
  const { chapter_id } = req.body;
  const buyer_id = req.user.id;

  try {
    const existingPurchase = await Purchase.findOne({
      where: { user_id: buyer_id, chapter_id: chapter_id }
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'You have already purchased this chapter.' });
    }
    const chapter = await Chapter.findByPk(chapter_id, {
      attributes: ['id', 'name', 'price', 'user_id']
    });
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Lấy thông tin người mua và tác giả
    const buyer = await User.findByPk(buyer_id, {
      attributes: ['id', 'total_point'] 
    });
    const author = await User.findByPk(chapter.user_id, {
      attributes: ['id', 'total_point']
    });
    
    if (!buyer || !author) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kiểm tra số dư người mua
    if (buyer.total_point < chapter.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Trừ tiền người mua
    buyer.total_point -= chapter.price;
    await buyer.save();

    // Cộng tiền cho tác giả
    author.total_point += chapter.price;
    await author.save();

    // Lưu giao dịch vào bảng transactions
    await Transaction.create({
      user_id: buyer_id,
      type: 'purchase',
      amount: chapter.price,
      status: 'completed',
      description: `Bạn mua chapter id:  ${chapter_id}`
    });

    await Transaction.create({
      user_id: author.id,
      type: 'deposit',
      amount: chapter.price,
      status: 'completed',
      description: `Có người mua chapter id: ${chapter_id}`
    });



    await Purchase.create({
      user_id: buyer_id,
      chapter_id: chapter_id,
      created_at: new Date()
    });
    

    return res.status(200).json({ message: 'Mua chap thành công',status:'success' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const depositRequest = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }
    const { amount } = req.body;
    const user_id=req.user.id

    if (amount <= 0) {
      return res.status(400).json({ error: "Số tiền phải lớn hơn 0." });
    }

    const user = await User.findByPk(user_id, {
      attributes: ["id", "name"], 
    });
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }
    const transaction = await Transaction.create({
      user_id: user_id,
      type: "deposit",
      amount: amount,
      status: "pending", // Chờ xác nhận
      description: `Yêu cầu nạp tiền từ ${user.name}`,
    });

    res.status(200).json({ message: "Yêu cầu nạp tiền đã được tạo. Vui lòng chờ xác nhận!", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const withdrawRequest = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }
    const { amount } = req.body;
    const user_id = req.user.id;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Số tiền phải là một số dương hợp lệ." });
    }
    const user = await User.findByPk(user_id, { attributes: ["id", "total_point"] });

    if (user.total_point < amount) {
      return res.status(400).json({ error: "Số dư không đủ để rút tiền." });
    }

    const transaction = await Transaction.create({
      user_id,
      type: "withdraw",
      amount: parseFloat(amount), 
      status: "pending", 
      description: "Yêu cầu rút tiền",
    });

    res.status(200).json({ message: "Yêu cầu rút tiền đã được tạo. Vui lòng chờ xác nhận!", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const upExp = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }
    const user_id = req.user.id;

    const user = await User.findByPk(user_id, {
      attributes: ["id", "exp"],
    });

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại." });
    }
    user.exp += 5;
    await user.save();

    res.status(200).json({ message: "Đã cộng 5 EXP!", newExp: user.exp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkAction = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login first' });
    }

    const user_id = req.user.id;
    const comic_id = req.params.id;

    // Kiểm tra nếu user đã follow comic hay chưa
    const followRecord = await Follow.findOne({
      where: { user_id, comic_id }
    });

    const follow = !!followRecord; // Chuyển kết quả thành true/false

    return res.status(200).json({ follow });

  } catch (error) {
    console.error('Lỗi:', error);
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { 
  getInfo,
  updateUser, 
  deleteUser, 
  getFollowByUser, 
  getHistoryByUser,
  getCommentByUser,
  saveHistory,
  buyChapter,
  depositRequest,
  withdrawRequest,
  upExp,
  checkAction
};
