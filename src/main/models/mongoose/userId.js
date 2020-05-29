import mongoose from 'mongoose';

const UserIdSchema = mongoose.Schema({
    id : {type: Number, required: true, unique: true}
});

module.exports = mongoose.model('UserId', UserIdSchema);