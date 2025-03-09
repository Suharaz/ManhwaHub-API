const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Comic = require('./comic');

const Follow = sequelize.define('Follow', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  comic_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  created_at: { // Di chuyển cấu hình vào đây
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: { // Di chuyển cấu hình vào đây
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'follows',
  timestamps: true, // Bật timestamps
  createdAt: 'created_at', // Ánh xạ tên cột
  updatedAt: 'updated_at', // Ánh xạ tên cột
});

Follow.belongsTo(User, { foreignKey: 'user_id' });
Follow.belongsTo(Comic, { foreignKey: 'comic_id' });

module.exports = Follow;