import mongoose from 'mongoose';

const CartItemSchema = mongoose.Schema({
    uuid: { type: String, required: 'Must have uuid'},
    itemId: { type: Number, required: 'Must have itemId'},
});

module.exports = mongoose.model('CartItem', CartItemSchema);