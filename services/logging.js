const { createLogger, format, transports } = require('winston');

exports.logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple()
    ),
    transports: [new transports.Console()]
});