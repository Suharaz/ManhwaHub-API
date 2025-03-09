const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Chapter = require('./chapter');

const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  chapter_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  
}, {
  tableName: 'purchases',
  timestamps: false,
});

Purchase.belongsTo(User, { foreignKey: 'user_id' });
Purchase.belongsTo(Chapter, { foreignKey: 'chapter_id' });
module.exports = Purchase;
