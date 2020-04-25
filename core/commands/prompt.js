const generateText = require('../utils/backend_generate_text');

module.exports = async (ctx) => {
    let text = ctx.message.text;
    let prompt = text.slice(text.indexOf("/prompt") + 1).trim();

    try {
        let response = await generateText(prompt,500)

        console.log(response.data.result);

        await ctx.reply(response.data.result);
    } catch (e) {
        console.log(e.stack);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time");
    }
}