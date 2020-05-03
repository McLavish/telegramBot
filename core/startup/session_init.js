const Chat = require("../models/chat");
const User = require("../models/user");

const SessionDocument = require("../classes/session_document");

//For each new user a session is created
module.exports = async (ctx) => {
    //Load the user's saved conversation from the DB
    let mongoUser = await User.findOne({"id":ctx.message.from.id}).exec();

    if (mongoUser == null)
        throw new Error("User not found! Database might be corrupted");

    let chat = await ctx.getChat();
    let mongoChat = await Chat.findOne({"id":chat.id}).exec();

    if(mongoChat == null)
        throw new Error("Chat not found! Database might be corrupted");

    ctx.session.document = new SessionDocument(mongoUser, mongoChat);
}
