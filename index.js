import 'dotenv/config';
const express = require('express');
const app = express();
const port = 3000;

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