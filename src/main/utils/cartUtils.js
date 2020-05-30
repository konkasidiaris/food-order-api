import menuService from '../services/menuService';

const getMenu = () => menuService.getAll();

const calculateCartTotal = (items) => {
    return items.reduce((total, item) => {
        return total + item.price;
    }, 0);
}

const translateItems = async function (items) {
    const translatedItems = [];
    const [menu] = await Promise.all([getMenu()])
    items.forEach(item => {
        const tempItem = menu.find(e => e.id === item.itemId);
        const translatedItem = {
            itemId: tempItem.id,
            name: tempItem.name,
            price: tempItem.price
        };
        translatedItems.push(translatedItem);
    });
    return translatedItems;
}

const parseCart = async function (items)  {
    const tItems = await translateItems(items);
    const total = calculateCartTotal(tItems);
    const cart = {
        uuid: items[0].uuid,
        totalPrice: total,
        items: tItems
    };
    return cart;
}

export default {
    parseCart,
    calculateCartTotal,
    translateItems
}