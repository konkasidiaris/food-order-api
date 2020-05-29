import CartModel from '../models/mongoose/cart';
import cartUtils from '../utils/cartUtils';

async function createCart(userId){
    const cart = new CartModel({userId: userId, items:[], totalPrice:0});
    return cart.save();
}

async function getCart(userId) {
    let cart = await CartModel.findOne({ userId: userId });
    if (!cart){
        cart = await createCart(userId);
    }
    return cart;
}

async function updateCart(cart) {
    const oldCart = await getCart(cart.userId);
    oldCart.items = cart.items;
    oldCart.totalPrice = cartUtils.calculateCartTotal(cart);
    return oldCart.save();
}

async function deleteCart(userId){
    return CartModel.deleteOne({userId:userId});
}

module.exports = {
    getCart,
    updateCart,
    deleteCart
}