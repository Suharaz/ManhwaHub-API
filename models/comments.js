const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Comic = require('./comic');
const Chapter = require('./chapter');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    }
  },
  comic_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    field: 'comic_id',
    references: {
      model: Comic,
      key: 'id'
    }
  },
  chapter_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    field: 'chapter_id',
    references: {
      model: Chapter,
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    field: 'parent_id'
  },
  created_at: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'comment',
  tableName: 'comments',
  timestamps: true,
  underscored: true 
});

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Comic, { foreignKey: 'comic_id'});
Comment.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = Comment;
