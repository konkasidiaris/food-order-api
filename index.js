import 'dotenv/config';
import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();
const port = 3000;
const dsn = 'mongodb://localhost:37017/food-order-db';

MongoClient.connect(dsn,{ useUnifiedTopology: true }, (err,db) => {
    if (err) throw err;
    console.log("Connected successfully to MongoDB server");
    db.close();
});

function inserMongoDB(collection, data){
    const promisedInserts = [];

    Object.keys(data).forEach((key) => {
        promisedInserts.push(
            colleciton.inserOne({date: key, value: data[key]})
        );
    });
    return Promise.all(promisedInserts);
}

/**
 * process.env.DB_SECRET
 */

app.get('/', (req, res) => res.send('Hello World!'));

app.use((req, res, next) => res.status(404).send("Sorry can't find that!"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));