import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import bodyParser from 'body-parser';
import routes from './src/main/routes/routes';

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = 3000;

routes(app);

app.use((req, res, next) => res.status(404).send("404 Sorry can't find that!"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Something broke! My bad');
});

app.listen(PORT, () => console.log(`food-order-api is listening at http://localhost:${PORT}`));