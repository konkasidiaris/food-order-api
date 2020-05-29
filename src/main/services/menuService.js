import MenuItemModel from '../models/mongoose/MenuItem';

async function getAll() {
    return MenuItemModel.find({});
}

async function getItemsByCategory(category) {
    return MenuItemModel.find({ category: category });
}

async function addToMenu(element) {
    const item = new MenuItemModel(element);
    return item.save();
}

module.exports = {
    getAll,
    getItemsByCategory,
    addToMenu
}