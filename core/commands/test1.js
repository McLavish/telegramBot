const mongoose = require('mongoose');
const axios = require('axios');

const timestamp = Math.floor(Date.now() / 1000);

module.exports = async (ctx) => {

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

        mongoUser.context = lines.length > 8 ? lines.slice(-8).join('\n') : modifiedPrompt;
        mongoUser.context += filteredText;

        //console.log(ctx.session.context);

    session.mongoChat.messages.push({
        id: message.id,
        from: session.mongoChat.type === 'private' ? '' : mongoUser.id,
        date: message.date,
        text: message.text
    });

    await session.mongoChat.save();
    await session.mongoUser.save();
}