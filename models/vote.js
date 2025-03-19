const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Vote = sequelize.define('Vote', {
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
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
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
    tableName: 'votes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Vote.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Vote;