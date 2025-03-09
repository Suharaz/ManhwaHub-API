const Comic = require('../models/comic');
const Chapter = require('../models/chapter');
const User = require('../models/user');
const Comment = require('../models/comment');

// Lấy danh sách người dùng
const getAdminUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role_id', 'status'] });
  res.json(users);
};


// // Lấy danh sách truyện (có thể lọc theo trạng thái)
// const getAdminComics = async (req, res) => {
//   const { status } = req.query;
//   let whereClause = {};
//   if (status) {
//     whereClause.status = status;
//   }
//   const comics = await Comic.findAll({ where: whereClause, attributes: ['id', 'name', 'slug', 'thumbnail', 'status'] });
//   res.json(comics);
// };

// // Duyệt/trạng thái truyện
// const updateAdminComicStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const comic = await Comic.findByPk(id);
//   if (!comic) return res.status(404).json({ message: 'Comic not found' });

//   await comic.update({ status });
//   res.json(comic);
// };

// // Xóa truyện
// const deleteAdminComic = async (req, res) => {
//   const { id } = req.params;
//   const comic = await Comic.findByPk(id);
//   if (!comic) return res.status(404).json({ message: 'Comic not found' });

//   await comic.destroy();
//   res.json({ message: 'Comic deleted' });
// };

// module.exports = {
//   createComic,
//   updateComic,
//   deleteComic,
//   createChapter,
//   getUsers,
//   updateUserLevel,
//   deleteComment,
//   getRevenues,
//   getAdminUsers,
//   updateAdminUser,
//   deleteAdminUser,
//   getAdminComics,
//   updateAdminComicStatus,
//   deleteAdminComic,
// };
