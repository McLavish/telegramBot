const mongoose = require('mongoose');
const axios = require('axios');

const User = require("./../models/user");
const Chat = require("./../models/chat");

const timestamp = Math.floor(Date.now() / 1000);

module.exports = async (ctx) => {
    //console.log(ctx.message);
    let message = ctx.message;
    let user = message.from;
    let session = ctx.session;

    if ( message.date < timestamp) {
        return;
    }

    if (!session.context) {
        //console.log("Assigned session variable of user " + user.id);
        session.context = "Me: Hello, how are you?\n";
    }

    if (session.remember) {
        session.context = message.text + "\n" + session.context;
        return;
    }

    let modifiedPrompt = `${session.context}You: ${message.text}\nMe: `;

    try {
        let response = await axios.post('https://6f45ce70.ngrok.io/predict', {
            prompt: modifiedPrompt,
            length: 60,
            timeout: 5000
        });

        //console.log(response);

        let filteredText = filterResponse(response.data.result);

        await ctx.reply(filteredText || "...");

        let lines = modifiedPrompt.split("\n");

        //console.log(lines);

        ctx.session.context = lines.length > 5 ? lines.slice(-5).join('\n') : modifiedPrompt;
        ctx.session.context += filteredText;

        //console.log(ctx.session.context);
    } catch (e) {
        //console.log(e);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time")
    }

    if(!session.firstTime){
        let chat = await ctx.getChat();
        console.log(chat)

        let checkChat = await Chat.findById(chat.id);
        //console.log(docs);

        if(!checkChat){
            let newChar = new Chat({
                _id: chat.id,
                type: chat.type,
                title: chat.title,
                description: chat.description
            });
            newChar.save();
        }

        let member = await ctx.getChatMember(user.id);
        console.log(member)

        let checkUser = await User.findById(user.id);
        //console.log(docs);

        if(!checkUser){
            let newUser = new User({
                _id: user.id,
                first_name: user.first_name,
                language_code: user.language_code
            });
            newUser.save();
        }

        session.firstTime = true;
    }
}