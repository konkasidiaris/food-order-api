import OrderModel from '../models/mongoose/order';

async function fetchAllOrders() {
    return OrderModel.find({});
}

async function storeOrder(cart,address){
    const order = new OrderModel({
        uuid:cart.uuid,
        items:cart.items,
        totalPrice: cart.totalPrice,
        address: address
    });
    return order.save();
}

module.exports = {
    fetchAllOrders,
    storeOrder
}