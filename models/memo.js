const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');
const { Board } = require('./board');

const Memo = sequelize.define('memo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    position: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    config: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'memo',
    createdAt: false,
    updatedAt: false
});

module.exports = { Memo }