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
    let mongoUser = session.mongoUser;

    if (session.remember) {
        mongoUser.context = message.text + "\n" + mongoUser.context;
        return;
    }

    let modifiedPrompt = `${mongoUser.context}You: ${message.text}\nMe: `;

    console.log(" ----------------------RAW INPUT ----------------------\n" + modifiedPrompt)

    try {
        let response = await axios.post('https://16628c72.ngrok.io/predict', {
            prompt: modifiedPrompt,
            length: 60,
            timeout: 5000
        });

        console.log(" ----------------------RAW RESPONSE ----------------------\n" + response.data.result);

        let filteredText = filterResponse(response.data.result);

        console.log(" ----------------------FILTERED RESPONSE ----------------------\n" + filteredText);

        await ctx.reply(filteredText || "...");

        let lines = modifiedPrompt.split("\n");

        //console.log(lines);

        mongoUser.context = lines.length > 5 ? lines.slice(-5).join('\n') : modifiedPrompt;
        mongoUser.context += filteredText;

        //console.log(ctx.session.context);
    } catch (e) {
        console.log(e);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time")
    }

    session.mongoChat.messages.push({
        id: message.id,
        from: session.mongoChat.type === 'private' ? '' : mongoUser.id,
        date: message.date,
        text: message.text
    });

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

function filterResponse(rawText) {

    if (rawText.indexOf("you:") !== -1)
        rawText = rawText.substring(0, rawText.indexOf("You:"));

    if (rawText.indexOf("Me:") !== -1)
        rawText = rawText.substring(0, rawText.indexOf("Me:"));

    if (!rawText.endsWith("\n"))
        rawText += '\n';

    //rawText = rawText.endsWith("\n") ? rawText.substring(0, rawText.length - 1) : rawText;
    return rawText;
}