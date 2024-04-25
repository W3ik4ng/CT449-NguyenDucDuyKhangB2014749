const mongoose = require('mongoose')
const config = require('../config');

class MongooseService {
    static async connectDB() {
        try {
            await mongoose.connect(config.db.uri);

            console.log('Connected to DB');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MongooseService;