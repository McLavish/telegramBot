const mongoose = require('mongoose');
const axios = require('axios');

const Chat = require("./../models/chat");
const User = require("./../models/user");

const timestamp = Math.floor(Date.now() / 1000);

module.exports = async (ctx) => {
    console.log(ctx.message);
    let message = ctx.message;
    let user = message.from;
    let session = ctx.session;

    if ( message.date < timestamp) {
        return;
    }

    if (!session.user) {
        await init(ctx);
    }
    let context = session.mongoUser.context;

    if (session.remember) {
        context = message.text + "\n" + context;
        return;
    }

    let modifiedPrompt = `${context}You: ${message.text}\nMe: `;

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

        context = lines.length > 5 ? lines.slice(-5).join('\n') : modifiedPrompt;
        context += filteredText;

        //console.log(ctx.session.context);
    } catch (e) {
        //console.log(e);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time")
    }

    session.mongoChat.messages.push({
        id: message.id,
        from: user.id,
        date: message.date,
        text: message.text
    })

    await session.mongoChat.save();
    await session.mongoUser.save();
}

async function init(ctx){
    let user = ctx.message.from;
    let session = ctx.session;

    //console.log("Assigned session variable of user " + user.id);
    session.mongoUser = await User.findOne({"id":user.id});

    if (!session.mongoUser)
        throw new Error("User not found! Database might be corrupted");

    let chat = await ctx.getChat();
    session.mongoChat = await Chat.findOne({"id":chat.id});

    if(!session.mongoChat)
        throw new Error("Chat not found! Database might be corrupted");
}