const backendRequest = require('./backend_request');
const config = require('../config');

module.exports = async (ctx, modifiedPrompt) => {
    let message = ctx.message;
    let document = ctx.session.document;

    try {
        console.log(" ----------------------PROMPT ----------------------\n" + modifiedPrompt)
        let lines = modifiedPrompt.split(config.separator);

        let rawInput = document.remember.split(config.separator).join("\n") + lines.join("\n");

        console.log(" ----------------------RAW INPUT ----------------------\n" + rawInput)
        let response = await backendRequest(rawInput);
        let filteredText = filterResponse(response.data.result);

        console.log(" ----------------------RESPONSE ----------------------\n" + filteredText)
        ctx.reply(filteredText);

        document.context = lines.length > config.maxLinesStored ? lines.slice(-config.maxLinesStored).join(config.separator) : modifiedPrompt;
        document.context += filteredText + config.separator;

        console.log(" ----------------------DOCUMENT ----------------------\n" + document.context)
    } catch (e) {
        console.log(e.stack);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time");
    }

    document.pushMessage({
        id: message.id,
        date: message.date,
        text: message.text
    })

    await document.dbSave();
}

function filterResponse (rawText) {

    if (rawText.includes(config.userAlias))
        rawText = rawText.substring(0, rawText.indexOf(config.userAlias));

    if (rawText.includes(config.botAlias))
        rawText = rawText.substring(0, rawText.indexOf(config.botAlias));

    rawText = rawText.split("\n").join("");

    rawText = rawText.split("<|endoftext|>").join("");

    return rawText;
}