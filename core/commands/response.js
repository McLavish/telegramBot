const axios = require('axios');
const filterResponse = require('../utils/filter_response');

module.exports = async (ctx) => {
    console.log(ctx.message);
    let message = ctx.message;
    let sessionDocument = ctx.session.document;

    let modifiedPrompt = `${sessionDocument.context}You: ${message.text}\nMe: `;

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

        sessionDocument.context = lines.length > 8 ? lines.slice(-8).join('\n') : modifiedPrompt;
        sessionDocument.context += filteredText;

        //console.log(ctx.session.context);
    } catch (e) {
        console.log(e);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time");
    }

    sessionDocument.pushMessage({
        id: message.id,
        date: message.date,
        text: message.text
    })

    await sessionDocument.dbSave();
}