import 'dotenv/config';

const appname = "food-order-api";
//TODO: add logger
module.exports = {
    applicationName: appname,
    mongodb: {
        dsn: `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`
    },
};