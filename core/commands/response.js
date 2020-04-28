const generateText = require('../utils/generate_text');
const config = require('../config');

module.exports = async (ctx) => {
    let document = ctx.session.document;

    //`${document.context}You: ${ctx.message.text}${config.separator}Me: `
    let modifiedPrompt = document.context + config.userAlias + ctx.message.text + config.separator + config.botAlias;

    await generateText(ctx, modifiedPrompt);
}