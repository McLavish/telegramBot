const mongoose = require('mongoose');

//https://core.telegram.org/bots/api#user
const UserSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    username: String,
    language_code: String,
    creation_date: Number,
    context: String,
    remember: String,
});

module.exports = mongoose.model('User', UserSchema);
