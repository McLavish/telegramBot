const generateText = require('../utils/backend_generate_text');
const config = require('../config');

async function prompt (ctx, argument) {

    if (argument.length > config.maxPromptChars){
        await ctx.reply(`The prompt cannot exceed ${config.maxPromptChars} characters`);
        return;
    }

    try {
        let response = await generateText(argument,500)
        await ctx.reply(response.data.result);

    } catch (e) {
        console.log(e.stack);
        await ctx.reply(config.error_message);
    }
}

module.exports = {
    help: "Generates a story based on the passed text",
    example: "/prompt Once upon a time there was a wolf alone in a forest",
    has_argument: true,
    action: prompt
};
