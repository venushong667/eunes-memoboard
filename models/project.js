const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');
const { Board } = require('./board');

const Project = sequelize.define('project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    config: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    tableName: 'project',
    createdAt: true,
    updatedAt: false
});

module.exports = { Project }