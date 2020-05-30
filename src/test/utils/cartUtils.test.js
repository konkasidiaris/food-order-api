import utils from '../../main/utils/cartUtils';

const items = [{
        name: "item1",
        price: 1,
    }, {
        name: "item2",
        price: 2,
    }, {
        name: "item3",
        price: 5.5,
    }]
    ;

test('calculates the total price of a cart', () => {
    expect(utils.calculateCartTotal(items)).toBe(8.5);
});