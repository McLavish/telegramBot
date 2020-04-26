const generateText = require('../utils/generate_text');

module.exports = async (ctx) => {
    let document = ctx.session.document;

    let modifiedPrompt = `${document.context}Me: `;

    await generateText(ctx, modifiedPrompt);
}