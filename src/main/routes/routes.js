import menuService from '../services/menuService';
import cartService from '../services/cartService';
import uuidService from '../services/uuidService';
import menuParser from '../utils/menuParser';


const routes = (app) => {
    app.route('/menu')
        .get(async (req, res) => {
            try {
                const items = await menuService.getAll();
                const response = menuParser.parseFromDB(items);
                return res.send(response);
            } catch (err) {
                console.log(err);
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
                return res.send(cart);
            } catch (err) {
                console.log(err);
            }
        })
        .delete(async (req, res) => {
            const uuid = req.params.uuid;
            try {
                await cartService.deleteCart(uuid);
                return res.send("cart deleted");
            } catch (err) {
                console.log(err);
            }
        });
}

export default routes;

// app.post('/addToCart', async (req, res) => {
//     const cart = req.body;
//     try {
//         const cartItem = await cartService.updateCart(cart)
//     } catch (error) {
//         console.log(error);
//     }
// });