const calculateCartTotal = (cart) => {
    return cart.items.reduce((total, item) => {
        return total + item.price * item.amount;
    }, 0);
}

module.exports = {
    calculateCartTotal
}