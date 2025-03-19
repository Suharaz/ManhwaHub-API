const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Vote = require('./vote'); // Import trực tiếp

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    google_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total_point: {
        type: DataTypes.DOUBLE(8,2),
        allowNull: false,
        defaultValue: 0.00
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});



module.exports = User;
