const calculateCartTotal = (items) => {
    return items.reduce((total, item) => {
        return total + item.price;
    }, 0);
}

export default {
    calculateCartTotal
}