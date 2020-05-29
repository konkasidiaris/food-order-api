import mongoose from 'mongoose';

const CartSchema = mongoose.Schema({
    userId: { type: Number, required: true, index: true },
    items: [{
        item: {
            name: { type: String, required: true, index: false },
            price: { type: Number, required: true, index: false },
            amount: { type: Number, required: true, index: false },
        },
    }],
    totalPrice: { type: String, required: true, index: false },
});

module.exports = mongoose.model('Cart', CartSchema);