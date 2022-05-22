const { Sequelize } = require('sequelize');
const { logger } = require('./logging');
const config = require('../config');

const dbConfig = config.get('db');

exports.sequelize = new Sequelize(`${dbConfig.dialect}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);

exports.init = async () => {
    try {
        await this.sequelize.authenticate();
        // await this.sequelize.sync({force: true});
        await this.sequelize.sync();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error(`Unable to connect to the database: ${error}`);
    }
}
