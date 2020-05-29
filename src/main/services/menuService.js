import MenuItemModel from '../models/mongoose/MenuItem';

async function getAll() {
    return MenuItemModel.find({});
}

module.exports = {
    getAll
}