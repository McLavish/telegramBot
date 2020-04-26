const generateText = require('../utils/generate_text');
const config = require('../config');

module.exports = async (ctx) => {
    let document = ctx.session.document;

    let modifiedPrompt = `${document.context}You: ${ctx.message.text}${config.separator}Me: `;

    await generateText(ctx, modifiedPrompt);
}