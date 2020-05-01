const generateChatReply = require('../utils/generate_chat_reply');
const config = require('../config');

async function response(ctx) {
    let document = ctx.session.document;

    let modifiedPrompt = document.context + config.userAlias + ctx.message.text + config.separator + config.botAlias;
    await generateChatReply(ctx, modifiedPrompt);
}

module.exports = {
    help: "The default behaviour of the bot. It is implicitly called when a normal message is sent",
    action: response
}
