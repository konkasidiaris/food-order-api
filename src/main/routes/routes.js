import menuService from '../services/menuService';
import cartService from '../services/cartItemService';
import uuidService from '../services/uuidService';
import menuParser from '../utils/menuParser';
import cartUtils from '../utils/cartUtils';
import orderService from '../services/orderService';

const VIEWS_PATH = '../src/main/views';

const routes = (app) => {
    app.route('/menu')
        .get(async (req, res) => {
            try {
                const items = await menuService.getAll();
                const response = menuParser.parseFromDB(items);
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
    app.route('/cart/:uuid?')
        .get(async (req, res) => {
            const uuid = req.params.uuid;
            try {
                const cart = await cartService.getCart(uuid);
                const parsedResponse = await cartUtils.parseCart(cart);
                return res.send(parsedResponse);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        })
        .delete(async (req, res) => {
            const uuid = req.params.uuid;
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
            const { uuid, itemId } = req.body;
            try {
                const cart = await cartService.addToCart(uuid, itemId);
                return res.redirect(`/cart/${uuid}`);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/removeFromCart')
        .post(async (req, res) => {
            const { uuid, itemId } = req.body;
            try {
                const cart = await cartService.removeFromCart(uuid, itemId);
                return res.redirect(`/cart/${uuid}`);
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
                const order = await orderService.storeOrder(parsedCart, address);
                await cartService.deleteCart(uuid);
                return res.status(200).send(order);
            } catch (err) {
                console.log(err);
                return res.status(500).send("something went wrong");
            }
        });
    app.route('/orders')
        .get(async (req, res) => {
            try {
                const orders = await orderService.fetchAllOrders();
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
                res.render(`${VIEWS_PATH}/order.ejs`, {orders: orders});
            } catch (err) {
                console.log(err);
            }
        });
}

export default routes;