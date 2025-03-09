const Purchase = require('../models/purchase');
const Chapter = require('../models/chapter');

const calculateAuthorRevenue = async (authorId) => {
  const chapters = await Chapter.findAll({ where: { user_id: authorId } });
  const chapterIds = chapters.map(ch => ch.id);
  const purchases = await Purchase.findAll({ where: { chapter_id: chapterIds } });
  const totalRevenue = purchases.reduce((sum, p) => {
    const chapter = chapters.find(ch => ch.id === p.chapter_id);
    return sum + (chapter ? chapter.price : 0);
  }, 0);
  return totalRevenue;
};

module.exports = { calculateAuthorRevenue };