const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: Number,
    first_name: String,
    username: String,
    language_code: String,
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat' }],
});

module.exports = mongoose.model('User', UserSchema);