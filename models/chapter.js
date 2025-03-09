const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chapter = sequelize.define('Chapter', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  translator_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(191),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(191),
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING(191),
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE(8, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  chapter_number: {
    type: DataTypes.DOUBLE(8, 2),
    allowNull: false,
  },
  volume: {
    type: DataTypes.STRING(191),
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  server_name: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  comic_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'chapters',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Chapter; // Xuất Chapter trước

// Require và thiết lập quan hệ sau khi xuất
const Comic = require('./comic');
const User = require('./user');
const Translator = require('./translator');

Chapter.belongsTo(Comic, { foreignKey: 'comic_id' });
Chapter.belongsTo(User, { foreignKey: 'user_id' });
Chapter.belongsTo(Translator, { foreignKey: 'translator_id' });