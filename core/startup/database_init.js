const User = require("../models/user");
const Chat = require("../models/chat");

module.exports = async (ctx) => {
    let user = ctx.message.from;

    let member = await ctx.getChatMember(user.id);

    if (member.is_bot)
        return;

    let checkUser = await User.findOne(user.pid);

    console.log(checkUser);

    let newUser;
    if(!checkUser) {
        newUser = new User({
            id: member.user.id,
            first_name: member.user.first_name,
            language_code: member.user.language_code,
            context: "Me: Hello, how are you?\n",
            creation_date: Math.floor(Date.now() / 1000)
        });

        await newUser.save();
    }
    let chat = await ctx.getChat();

    let checkChat = await Chat.findOne(chat.pid);

    if(!checkChat){

        let newChat = new Chat({
            id: chat.id,
            type: chat.type,
            title: chat.title,
            description: chat.description,
            creation_date: Math.floor(Date.now() / 1000),
            members: [{
                status: member.status,
                user: newUser._id
            }],
        });

        await newChat.save();
    }
    ctx.reply("Hello, how are you?");
}