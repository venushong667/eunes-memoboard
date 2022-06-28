var convict = require('convict');

// Define a schema
var config = convict({
    name: "memoboard",
    env: {
        doc: 'The application environment.',
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3003,
        env: 'PORT',
        arg: 'port'
    },
    db: {
        dialect: {
            doc: 'Database dialect type',
            format: String,
            env: 'DB_DIALECT',
            default: 'postgres'
        },
        host: {
            doc: 'Database host name',
            format: String,
            env: 'DB_HOST',
            default: 'database'
        },
        port: {
            doc: 'Database port',
            format: Number,
            env: 'DB_PORT',
            default: 5432
        },
        user: {
            doc: 'Database username',
            format: String,
            env: 'DB_USER',
            default: "postgres"
        },
        password: {
            doc: 'Database password',
            format: String,
            env: 'DB_PASSWORD',
            default: "password"
        },
        name: {
            doc: 'Database name',
            format: String,
            env: 'DB_NAME',
            default: 'memoboard'
        }
    },
    amqp: {
        host: {
            doc: 'AMQP host.',
            format: String,
            default: 'rabbit',
            env: 'AMQP_HOST'
        },
        port: {
            doc: 'AMQP port.',
            format: Number,
            default: 5672,
            env: 'AMQP_PORT'
        },
        user: {
            doc: 'AMQP user.',
            format: String,
            default: 'rabbit',
            env: 'AMQP_USER'
        },
        password: {
            doc: 'AMQP password.',
            format: String,
            default: 'password',
            env: 'AMQP_PASSWORD'
        },
        vhost: {
            doc: 'AMQP vhost.',
            format: String,
            default: '/',
            env: 'AMQP_VHOST'
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;