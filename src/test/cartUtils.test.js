import utils from '../main/cartUtils';

const cart = {
    items: [{
        name: "item1",
        price: 1,
        amount: 2
    }, {
        name: "item2",
        price: 2,
        amount: 2
    }, {
        name: "item3",
        price: 5,
        amount: 1
    }]
};

test('calculates the total price of a cart', () => {
    expect(utils.calculateCartTotal(cart)).toBe(11);
});