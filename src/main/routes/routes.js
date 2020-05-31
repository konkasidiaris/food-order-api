import menuService from '../services/menuService';
import cartService from '../services/cartItemService';
import uuidService from '../services/uuidService';
import menuParser from '../utils/menuParser';
import cartUtils from '../utils/cartUtils';
import orderService from '../services/orderService';
import currencyService from '../services/currencyService';

const VIEWS_PATH = '../src/main/views';

//TODO remove duplication of currency service calls
//TODO find a valid way to covert the prices in a .00 format
//TODO clean the mess of anonymous functions
//TODO pass data using next and not by query string
//TODO pass error handling to a higher order function
const routes = (app) => {
    app.route('/menu/:currency?')
        .get(async (req, res) => {
            const curr = req.params.currency || "EUR";
            try {
                const items = await menuService.getAll();
                const response = menuParser.parseFromDB(items);
                const currency = await currencyService.fetchCurrency(curr);
                response.forEach(item => item.price *= currency);
                return res.send(response);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/uuid')
        .get((req, res) => {
            return res.send(uuidService.createUUId());
        });
    app.route('/cart/:uuid?&:currency?')
        .get(async (req, res) => {
            const curr = req.params.currency || "EUR";
            const uuid = req.params.uuid;
            try {
                const cart = await cartService.getCart(uuid);
                if (cart.length > 0) {
                    const parsedResponse = await cartUtils.parseCart(cart);
                    const currency = await currencyService.fetchCurrency(curr);
                    parsedResponse.items.forEach(item => item.price *= currency);
                    return res.send(parsedResponse);
                }
                return res.send(cart);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        })
        .delete(async (req, res) => {
            const { uuid } = req.body;
            try {
                await cartService.deleteCart(uuid);
                return res.status(200).send("Cart deleted");
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/addToCart')
        .post(async (req, res) => {
            const { uuid, itemId, currency } = req.body;
            try {
                await cartService.addToCart(uuid, itemId);
                return res.redirect(`/cart/${uuid}&${currency}`);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/removeFromCart')
        .post(async (req, res) => {
            const { uuid, itemId, currency } = req.body;
            try {
                await cartService.removeFromCart(uuid, itemId);
                return res.redirect(`/cart/${uuid}&${currency}`);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/checkout')
        .post(async (req, res) => {
            const { uuid, address } = req.body;
            try {
                const cart = await cartService.getCart(uuid);
                const parsedCart = await cartUtils.parseCart(cart);
                await orderService.storeOrder(parsedCart, address);
                await cartService.deleteCart(uuid);
                return res.status(200).send("order received");
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/orders/:currency?')
        .get(async (req, res) => {
            const curr = req.params.currency;
            try {
                const orders = await orderService.fetchAllOrders();
                const currency = await currencyService.fetchCurrency(curr);
                orders.forEach(order => order.items.forEach(item => item.price *= currency));
                return res.status(200).send(orders);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/merchant')
        .get(async (req, res) => {
            try {
                const orders = await orderService.fetchAllOrders();
                res.render(`${VIEWS_PATH}/order.ejs`, { orders: orders });
            } catch (err) {
                console.log(err);
            }
        });
    app.route('/supported-currencies')
        .get(async (req, res) => {
            try {
                const currencies = await currencyService.fetchCurrencies();
                return res.status(200).send(currencies);
            } catch (err) {
                console.log(err);
            }
        })
}

export default routes;