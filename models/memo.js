const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');

const Memo = sequelize.define('Memo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    boardId: {
        type: DataTypes.UUID,
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