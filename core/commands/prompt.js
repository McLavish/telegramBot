const generateText = require('../utils/backend_request');

module.exports = async (ctx, argument) => {
    try {
        let response = await generateText(argument,500)

        console.log(response.data.result);

        await ctx.reply(response.data.result);
    } catch (e) {
        console.log(e.stack);
        await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time");
    }
}