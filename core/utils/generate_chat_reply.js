const backendRequest = require('./backend_generate_text');
const config = require('../config');

/**
 * Generate a chat reply and save it to the database
 * @param {context} ctx - Telegram context with session
 * @param {string} modifiedPrompt - the escaped user input
 */
module.exports = async (ctx, modifiedPrompt) => {
    let message = ctx.message;
    let document = ctx.session.document;

    try {
        let lines = modifiedPrompt.split(config.separator);

        //Build the input string replacing the separator with newline (the AI generation works better with newlines)
        //The string has: user saved information + last n lines of the conversation
        let rawInput = document.remember.split(config.separator).join("\n") + lines.join("\n");

        //Note: JavaScript doesn't have a replaceAll function (replace replaces only the first occurance)
        //replacement is done using array.split(<replaced_value>).join(<new_value>)

        let response = await backendRequest(rawInput);
        let filteredText = filterResponse(response.data.result);

        if (filteredText)
            await ctx.reply(filteredText);
        else
            await ctx.reply("...");

        //If the contexts number of lines exceed the number defined in the config file we cut the previous conversation saving only the last n lines
        document.context = lines.length > config.maxLinesStored ? lines.slice(-config.maxLinesStored).join(config.separator) : modifiedPrompt;
        //Add the reply to the saved context
        document.context += filteredText + config.separator;

    } catch (e) {
        console.log(e.stack);
        await ctx.reply(config.error_message);
    }
    //Add the user message to the DB for analytics
    document.pushMessage({
        id: message.id,
        date: message.date,
        text: message.text
    });
    //Save the context inside the db so if the user disconnects from the session it will still be available
    await document.dbSave();
};
//GPT-2 Generates a full dialogue given a prompt, but I only want to take the first reply to the user message
function filterResponse (rawText) {
    //Remove all text after User alias, taking only the first line generated
    if (rawText.includes(config.userAlias))
        rawText = rawText.substring(0, rawText.indexOf(config.userAlias));
    //Sometimes GPT-2 may write two sentences using the same Bot alias. We want to remove all that text too
    if (rawText.includes(config.botAlias))
        rawText = rawText.substring(0, rawText.indexOf(config.botAlias));

    //Remove all extra new lines, they only make the AI more confused
    rawText = rawText.split("\n").join("");
    //Sometimes an endoftext token might be included in the generated text
    rawText = rawText.split("<|endoftext|>").join("");

    return rawText;
}
