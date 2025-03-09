// models/translator.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Translator = sequelize.define('Translator', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(191),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(191),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING(191),
    allowNull: true,
  },
  title_seo: {
    type: DataTypes.STRING(191),
    allowNull: true,
  },
  meta_keywords: {
    type: DataTypes.STRING(191),
    allowNull: true,
  },
  meta_description: {
    type: DataTypes.STRING(191),
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
  tableName: 'translators',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Translator;