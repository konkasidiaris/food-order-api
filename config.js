import 'dotenv/config';

const APP_NAME = "food-order-api";
//TODO: add logger
module.exports = {
    applicationName: APP_NAME,
    mongodb: {
        dsn: `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`
    },
};