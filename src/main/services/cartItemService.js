import CartItemModel from '../models/mongoose/CartItem';

async function getCart(uuid){
    return CartItemModel.find({uuid:uuid});
}

async function deleteCart(uuid){
    return CartItemModel.deleteMany({uuid:uuid})
}

async function addToCart(uuid,itemId){
    const cartItem = new CartItemModel({uuid: uuid, itemId: itemId});
    return cartItem.save();
}

async function removeFromCart(uuid,itemId){
    return CartItemModel.deleteOne({uuid: uuid, itemId: itemId})
}

module.exports = {
    getCart,
    deleteCart,
    addToCart,
    removeFromCart
}