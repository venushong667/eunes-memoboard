var express = require('express');
var createError = require('http-errors');
var path = require('path');
const config = require('./config');
const { logger } = require('./services/logging');

var { amqpClient } = require('./services/amqp');

const fs = require('fs');
const db = require('./services/db');

const port = config.get('port');

exports.run = () => {
    startServer();
}

// const setErrorHandler = (app) => {
//     // catch 404 and forward to error handler
//     app.use((req, res, next) => {
//         next(createError(404));
//     });

//     // error handler
//     app.use((err, req, res, next) => {
//         // set locals, only providing error in development
//         res.locals.message = err.message;
//         res.locals.error = req.app.get('env') === 'development' ? err : {};
        
//         // render the error page
//         res.status(err.status || 500);
//         res.render('error');
//     });
// }

const startServer = () => {
    var app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    
    app.get('/health', function(req, res, next) {
        res.json({'status': 'UP'});
    });

    // setErrorHandler(app)
    db.init();
    amqpClient.init();

    var files = fs.readdirSync('./handlers/');
    for (let file of files) {
        if (file.endsWith('.js')) {
            require('./handlers/' + file)(app);
        }
    }

    app.listen(port, () => {
        logger.info(`Example app listening on port ${port}`);
    })
}

this.run()
