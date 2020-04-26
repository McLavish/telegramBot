const User = require("../models/user");
const Chat = require("../models/chat");

module.exports = async (ctx) => {
    let user = ctx.message.from;

    //Member serve solo per prendere lo status della chat (lo user lo ho già da message.from)
    let member = await ctx.getChatMember(user.id);

    if (member.is_bot)
        return;

    let checkUser = await User.findOne( {id: user.id} );

    console.log(checkUser);

    if(!checkUser) {
        let newUser = new User({
            id: member.user.id,
            first_name: member.user.first_name,
            language_code: member.user.language_code,
            context: "Me: Hello, how are you?~",
            remember: "",
            creation_date: Math.floor(Date.now() / 1000)
        });

        await newUser.save();
    }
    let chat = await ctx.getChat();

    let checkChat = await Chat.findOne( {id: chat.id} );

    if(!checkChat){

        let newChat = new Chat({
            id: chat.id,
            type: chat.type,
            title: chat.title,
            description: chat.description,
            creation_date: Math.floor(Date.now() / 1000),
            members: [{
                status: member.status,
                user: checkUser._id
            }],
        });

        await newChat.save();
    }
    ctx.reply("Hello, how are you?");
}