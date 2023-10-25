const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/docker-node-mongo'

const connectDb = () => {
    mongoose.connect(url)
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => {
            console.log('Error connecting to database:', error);
        });
}

module.exports = connectDb;