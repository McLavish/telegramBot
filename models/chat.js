const mongoose = require('mongoose');

//https://core.telegram.org/bots/api#chat
const ChatSchema = new mongoose.Schema({
    id: Number,
    type: String,
    title: String,
    description: String,
    creation_date: Number,
    members: [{
        status: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    messages: [{
        id: Number,
        from: Number,
        date: Number,
        text: String
    }]
});

module.exports = mongoose.model('Chat', ChatSchema);