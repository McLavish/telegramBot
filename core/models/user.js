const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    username: String,
    language_code: String,
    creation_date: Number,
    context: String,
    remember: String,
    /*
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat' }],
     */
});

module.exports = mongoose.model('User', UserSchema);