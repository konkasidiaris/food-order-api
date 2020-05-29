import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    items: { type: Array, "default": [] },
    address: { type: Address, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);