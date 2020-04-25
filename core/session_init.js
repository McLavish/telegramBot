const Chat = require("./models/chat");
const User = require("./models/user");

module.exports = async (ctx) => {
    let sender = ctx.message.from;
    let session = ctx.session;

    //console.log("Assigned session variable of user " + user.id);
    session.mongoUser = await User.findOne({"id":sender.id});

    if (session.mongoUser == null)
        throw new Error("User not found! Database might be corrupted");

    let chat = await ctx.getChat();
    session.mongoChat = await Chat.findOne({"id":chat.id});

    if(session.mongoChat == null)
        throw new Error("Chat not found! Database might be corrupted");
}