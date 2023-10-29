const pino = require('pino');
const pinoPretty = require('pino-pretty');

const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    prettifier: pinoPretty
});

module.exports = logger;
