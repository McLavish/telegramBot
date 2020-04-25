const filterResponse = require('../utils/filter_response');
const generateText = require('../utils/backend_generate_text');

module.exports = async (ctx) => {
    //console.log(ctx.message);
    let message = ctx.message;
    let sessionDocument = ctx.session.document;

    let modifiedPrompt = `${sessionDocument.context}You: ${message.text}\nMe: `;

    console.log(" ----------------------RAW INPUT ----------------------\n" + modifiedPrompt)

    try {
        let response = await generateText(modifiedPrompt);

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
        console.log(e.stack);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time");
    }

    sessionDocument.pushMessage({
        id: message.id,
        date: message.date,
        text: message.text
    })

    await sessionDocument.dbSave();
}