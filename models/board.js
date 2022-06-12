const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');

const Board = sequelize.define('Board', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    projectId: {
        type: DataTypes.UUID,
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
    tableName: 'board',
    createdAt: false,
    updatedAt: false
});

module.exports = { Board }