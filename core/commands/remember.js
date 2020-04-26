const config = require('../config');

module.exports = async (ctx, argument) => {
    let document = ctx.session.document;

    let newRemember = document.remember + argument + config.separator;

    if (newRemember.length > 280)
        await ctx.reply("Your saved information cannot exceed 280 characters");

    else {
        document.remember = newRemember;
        await document.dbSave();
        await ctx.reply("Updated successfully. Your new saved information is:");
        await ctx.reply(document.remember.split(config.separator).join("\n"));
    }
}