const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw', 'purchase'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP'
  }
}, {
  sequelize,
  modelName: 'transaction',
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Transaction;
