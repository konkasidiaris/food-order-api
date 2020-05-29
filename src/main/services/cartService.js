import CartModel from '../models/mongoose/cart';
import {calculateCartTotal} from '../cartUtils';

async function getCart(userId) {
    return CartModel.find({ userId: userId });
}

async function updateCart(cart) {
    const oldCart = await getCart(cart.userId);
    oldCart.items = cart.items;
    oldCart.totalPrice = calculateCartTotal(cart);
    return oldCart.save();
}


module.exports = {
    getCart
}