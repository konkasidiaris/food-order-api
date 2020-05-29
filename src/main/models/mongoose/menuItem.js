import mongoose from 'mongoose';

const MenuItemSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String, index: false },
    price: { type: String, required: true, index: false },
    availability: { type: Boolean, required: true, index: false },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);