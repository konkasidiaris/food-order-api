import 'dotenv/config';
import axios from 'axios';

const URL = `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`;

//TODO: this can be cashed and called once a day
const fetchCurrencies = async () => {
    try {
        const response = await axios.get(URL);
        const json = response.data.rates;
        return json;
    } catch (err) {
        console.log(err);
    }
}

const fetchCurrency = async (curr = 'EUR') => {
    try {
        const rates = await fetchCurrencies();
        const currency = rates[curr];
        return currency;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    fetchCurrencies,
    fetchCurrency
}