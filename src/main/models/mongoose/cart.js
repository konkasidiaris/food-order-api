import mongoose from 'mongoose';

const CartSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [{
        item: {
            name: { type: String, required: false, index: false },
            price: { type: Number, required: false, index: false },
            amount: { type: Number, required: false, index: false },
        },
    }],
    totalPrice: { type: String, required: true, index: false },
});

module.exports = mongoose.model('Cart', CartSchema);