import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import menuService from './src/services/menuService';
import bodyParser from 'body-parser';

mongoose.connect(config.mongodb.dsn)
    .then(() => {
        console.log('Successfully connected to mongodb');
    });

const app = express();
app.use(bodyParser.json());
const port = 3000;

// const categories = {
//     APPETIZERS: "Appetizers",
//     SALADS: "Salads",
//     MAIN_DISHES: "Main Dishes",
//     BEVERAGES: "Beverages",
//     DESSERTS: "Desserts"
// }

// const food_tags = {
//     REGULAR: "Regular",
//     PESCATERIAN: "Pescaterian",
//     VEGETERIAN: "Vegeterian",
//     VEGAN: "Vegan",
//     NUT_FREE: "Nut free"
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

app.get('/menu', async (req, res, next) => {
    try {
        const items = await menuService.getAll();
        res.send(items);
    } catch(err){
        return next(err);
    }
    
});

app.post('/menu', async (req, res) => {
    const {id,name,category,description,price,availability }= req.body;
    try {
        await menuService.addToMenu({id,name,category,description,price,availability });
        return res.send("OK");
    } catch (err){
        console.log(err);
    }
});

app.use((req, res, next) => res.status(404).send("Sorry can't find that!"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));