const mongoose = require('mongoose')
const logger = require('../helpers/logger');
const url = 'mongodb://localhost:27017/docker-node-mongo'

const connectDb = () => {
    mongoose.connect(url)
        .then(() => {
            logger.info('Connected to database');
        })
        .catch((error) => {
            logger.erro('Error connecting to database:', error);
        });
}

module.exports = connectDb;