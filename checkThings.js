const User = require("./models/user");
const Chat = require("./models/chat");

module.exports = async (ctx) => {
    let user = ctx.message.from;

    let member = await ctx.getChatMember(user.id);

    if (member.is_bot)
        return;

    let checkUser = await User.findById(user.id);

    if(!checkUser){
        let newUser = new User({
            _id: member.user.id,
            first_name: member.user.first_name,
            language_code: member.user.language_code
        });

        await newUser.save();
    }
    let chat = await ctx.getChat();

    let checkChat = await Chat.findById(chat.id);

    if(!checkChat){

        let newChat = new Chat({
            _id: chat.id,
            type: chat.type,
            title: chat.title,
            description: chat.description,
            members: [{
                status: member.status,
                user: member.user.id
            }],
        });

        await newChat.save();
    }
    ctx.reply("AKNLOWLEDGE");
}