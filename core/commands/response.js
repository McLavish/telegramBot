const generateChatReply = require('../utils/generate_chat_reply');
const config = require('../config');
const filterInput = require('../utils/filter_input');

async function response(ctx) {
    let document = ctx.session.document;

    if (ctx.message.length > config.maxReplyChars){
        await ctx.reply(`The message cannot exceed ${config.maxReplyChars} characters`);
        return;
    }

    let modifiedPrompt = document.context + config.userAlias + filterInput(ctx.message.text,config.separator) + config.separator + config.botAlias;
    await generateChatReply(ctx, modifiedPrompt);
}

module.exports = {
    help: "The default behaviour of the bot. It is implicitly called when a normal message is sent",
    action: response
};
