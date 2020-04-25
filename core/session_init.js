const Chat = require("./models/chat");
const User = require("./models/user");

const SessionDocument = require("./classes/session_document");

module.exports = async (ctx) => {
    //console.log("Assigned session variable of user " + user.id);
    let mongoUser = await User.findOne({"id":ctx.message.sender.id});

    if (mongoUser == null)
        throw new Error("User not found! Database might be corrupted");

    let chat = await ctx.getChat();
    let mongoChat = await Chat.findOne({"id":chat.id});

    if(mongoChat == null)
        throw new Error("Chat not found! Database might be corrupted");

    ctx.session.document = new SessionDocument(mongoUser, mongoChat);
}