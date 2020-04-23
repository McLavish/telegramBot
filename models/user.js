const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: Number,
    first_name: {type: String},
    username: {type: String},
    language_code: {type: String},
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat' }],
});

module.exports = mongoose.model('User', UserSchema);