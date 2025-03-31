const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comic = sequelize.define('Comic', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(191),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    thumbnail: {
        type: DataTypes.STRING(191),
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    is_public: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    is_recommend: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    origin_name: {
        type: DataTypes.STRING(191),
        allowNull: true,
    },
    view_total: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    view_day: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    view_week: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    view_month: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false, // Đảm bảo NOT NULL khớp với DB
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    upview_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'comics',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Comic;

const Chapter = require('./chapter');
const Category = require('./category');
const Author = require('./author');
const Translator = require('./translator');
const Vote = require('./vote');

Comic.hasMany(Chapter, { foreignKey: 'comic_id' });
Comic.belongsToMany(Category, { through: 'comic_categories', foreignKey: 'comic_id', otherKey: 'category_id' });
Comic.belongsToMany(Author, { through: 'comic_authors', foreignKey: 'comic_id', otherKey: 'author_id' });
Comic.belongsToMany(Translator, { through: 'comic_translators', foreignKey: 'comic_id', otherKey: 'translator_id' });
Comic.hasMany(Vote, { foreignKey: 'comic_id' });
