import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import menuService from './src/main/services/menuService';
import cartService from './src/main/services/cartService';
import bodyParser from 'body-parser';
import uuidService from './src/main/services/uuidService';

mongoose.connect(
    config.mongodb.dsn,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to mongodb')
    );

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

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

app.get('/menu', async (req, res) => {
    try {
        const items = await menuService.getAll();
        return res.send(items);
    } catch (err) {
        console.log(err);
    }
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

app.get('/uuid', async (req, res) => {
    return res.send(uuidService.createUUId());
});

app.get('/cart/:uuid?', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const cart = await cartService.getCart(uuid);
        return res.send(cart);
    } catch (err) {
        console.log(err);
    }
});

app.post('/addToCart', async (req, res) => {
    const cart = req.body;
    try {
        const cartItem = await cartService.updateCart(cart)
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