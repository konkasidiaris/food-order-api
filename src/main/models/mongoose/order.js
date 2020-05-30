import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    uuid: { type: String, required: true },
    items: { type: Array, "default": [] },
    totalPrice: { type: Number, required: true },
    address: {
        nameOnBell: { type: String, required: true },
        floor: { type: String },
        streetName: { type: String, required: true },
        number: { type: String },
        postalCode: { type: String, required: true },
        city: { type: String, required: true }
    },
    dispatched: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);