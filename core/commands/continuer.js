const generateChatReply = require('../utils/generate_chat_reply');
const config = require('../config');

async function continuer(ctx) {
    let document = ctx.session.document;

    let modifiedPrompt = document.context + config.botAlias;
    await generateChatReply(ctx, modifiedPrompt);
}

module.exports = {
    help: "Forces the bot to continue the conversation without user input",
    action: continuer
}
