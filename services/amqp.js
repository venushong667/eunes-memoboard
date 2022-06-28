const amqp = require('amqplib/callback_api');
const config = require('../config');
const _ = require('lodash');

const amqpCfg = config.get('amqp')
const rabbit = `amqp://${amqpCfg.user}:${amqpCfg.password}@${amqpCfg.host}:${amqpCfg.port}${amqpCfg.vhost}`;

class AmqpClient {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.exchange = 'memoboard.actions';
        this.routingKeys = {
            'create': 'memoboard.create',
            'update': 'memoboard.update',
            'delete': 'memoboard.delete',
        }

        if (!AmqpClient.instance) {
            AmqpClient.instance = this;
        }
        return AmqpClient.instance;
    }

    init() {
        this.connect();
    }

    connect() {
        return amqp.connect(rabbit, (err0, conn) => {
            if (err0) throw err0;
            this.connection = conn;
            console.log('AMQP Initialized')
            conn.createChannel((err1, ch) => {
                if (err1) throw err1;
                this.channel = ch;
                this.setupExchange();
            });
        });
    };

    setupExchange() {
        this.channel.assertExchange(this.exchange, 'topic', { durable: false, autoDelete: false }, (err0) => {
            if (err0) throw err0;
        });
    }

    publish(content, action) {
        this.channel.publish(this.exchange, _.get(this.routingKeys, action), Buffer.from(JSON.stringify(content)), { persistent: false });
    }
}
const amqpClient = new AmqpClient;
module.exports = { amqpClient };