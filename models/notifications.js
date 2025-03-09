const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Notification extends Model {}

Notification.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    field: 'user_id',
    references: {
      model: User,
      key: 'id'
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    field: 'status'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  }
}, {
  sequelize,
  modelName: 'notification',
  tableName: 'notifications',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Notification;
