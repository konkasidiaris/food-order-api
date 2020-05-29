import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import menuService from './src/services/menuService';
import cartService from './src/services/cartService';
import bodyParser from 'body-parser';
import session from 'express-session';

mongoose.connect(config.mongodb.dsn, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to mongodb');
    });

const app = express();
app.use(bodyParser.json());

const MILLIS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const TWO_HOURS = MILLIS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * 2;

const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESSION_SECRET = 'secret',
    SESSION_NAME = 'SID',
    SESSION_LIFETIME = TWO_HOURS
} = process.env;

const IS_PRODUCTION = NODE_ENV === 'production';

app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        maxAge: SESSION_LIFETIME,
        sameSite: true,
        secure: IS_PRODUCTION
    }
}))

// const categories = {
//     APPETIZERS: "Appetizers",
//     SALADS: "Salads",
//     MAIN_DISHES: "Main Dishes",
//     BEVERAGES: "Beverages",
//     DESSERTS: "Desserts"
// }

// const currency = {
//     AUSTRALIAN_DOLLAR: "AUD",
//     CANADIAN_DOLLAR: "CAD",
//     SWITZERLAND_FRANC: "CHF",
//     CHINESE_YUAN: "CNY",
//     EURO: "EUR",
//     GREAT_BRITAIN_POUND: "GBP",
//     JAPANESE_YEN: "JPY",
//     US_DOLLAR: "USD"
// }

//middleware
const cookieCheck = (req, res, next) => {
    if (!req.session.userId){

    } 
    next();
}

app.get('/menu', async (req, res) => {
    const { userId } = req.session;
    try {
        const items = await menuService.getAll();
        return res.send(items);
    } catch (err) {
        console.log(err);
    }
    // req.session.userId = "asdf"
});

app.get('/menu/:category?', async (req, res) => {
    const category = req.params.category;
    try {
        const items = await menuService.getItemsByCategory(category);
        return res.send(items);
    } catch (err) {
        console.log(err);
    }
});

app.post('/menu', async (req, res) => {
    const { id, name, category, description, price, availability } = req.body;
    try {
        await menuService.addToMenu({ id, name, category, description, price, availability });
        return res.send("200 OK, item is added to menu");
    } catch (err) {
        console.log(err);
    }
});

app.get('/cart/:id?', async (req, res) => {
    const id = req.params.id;
    try {
        const cart = await cartService.getCart(id);
        return res.send(cart);
    } catch (err) {
        console.log(err);
    }
});

app.post('/addToCart', async (req, res) => {
    const item = req.body;
    try {
        const cartItem = await cartService.addCartItem(item)
    } catch (error) {
        console.log(error);
    }
});

app.use((req, res, next) => res.status(404).send("404 Sorry can't find that!"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Something broke! My bad');
});

app.listen(PORT, () => console.log(`food-order-api is listening at http://localhost:${PORT}`));