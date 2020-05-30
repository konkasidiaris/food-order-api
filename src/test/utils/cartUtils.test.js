import utils from '../../main/utils/cartUtils';
import { TestScheduler } from 'jest';

const items = [{
    uuid: "uuid",
    itemId: 1,
}, {
    uuid: "uuid",
    itemId: 1,
}, {
    uuid: "uuid",
    itemId: 2,
}];

const translatedItems = [{
    itemId: 1,
    name: "Feta",
    price: 2.5,
}, {
    itemId: 1,
    name: "Feta",
    price: 2.5,
}, {
    itemId: 2,
    name: "Tzatziki",
    price: 2.5,
}];

const parsedCart = {
    uuid: "uuid",
    items: translatedItems,
    totalPrice: 7.5
};

test('translate cart items by menu', () => {
    expect(utils.translateItems(items)).toBe(translatedItems)
});

// test('creates the representation of the cart in api', () => {
//     expect(utils.parseCart(items)).toBe(parsedCart);
// });