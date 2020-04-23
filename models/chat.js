const mongoose = require('mongoose');

//https://core.telegram.org/bots/api#chat
const ChatSchema = new mongoose.Schema({
    _id: Number,
    type: String,
    title: String,
    description: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        _id: Number,
        from: Number,
        date: Number,
        text: String
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);