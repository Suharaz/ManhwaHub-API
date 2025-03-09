const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Comic = require('./comic');

class History extends Model {}

History.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {  // Đổi từ userId -> user_id để đồng bộ với CSDL
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  comic_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false, // Bắt buộc phải có comic_id
    references: {
      model: Comic,
      key: 'id'
    }
  },

  list_chapter: {
    type: DataTypes.TEXT, // Giữ nguyên kiểu TEXT
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'History',
  tableName: 'histories',
  timestamps: true,
  underscored: true // Đảm bảo sử dụng snake_case
});

// Đảm bảo foreignKey đồng bộ với CSDL
History.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
History.belongsTo(Comic, { foreignKey: 'comic_id', as: 'comic' });

module.exports = History;
