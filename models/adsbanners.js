const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Adsbanner extends Model {}

Adsbanner.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  position: {
    type: DataTypes.STRING(191),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  sequelize,
  modelName: 'adsbanner',
  tableName: 'adsbanners',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Adsbanner;
