import menuService from '../services/menuService';
import cartService from '../services/cartItemService';
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
                return res.status(200);
            } catch (err) {
                console.log(err);
            }
        });
    app.route('/addToCart')
        .post(async (req, res) => {
            const {uuid, itemId} = req.body;
            try {
                const cart = await cartService.addToCart(uuid, itemId);
                return res.redirect(`/cart/${uuid}`);
             } catch(err){ 
                console.log(err);
                return res.status(404).send("something went wrong");
            }
        });
}

export default routes;