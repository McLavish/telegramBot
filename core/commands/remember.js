const config = require('../config');

async function remember (ctx, argument) {
    let document = ctx.session.document;
    console.log(document.remember);

    if (!argument) {
        await ctx.reply("Your saved information is:\n" + document.remember.split(config.separator).join("\n"));
        return;
    }

    let newRemember = document.remember + argument + config.separator;

    if (newRemember.length > 280)
        await ctx.reply("Your saved information cannot exceed 280 characters");

    else {
        document.remember = newRemember;
        await document.dbSave();

        await ctx.reply("Updated successfully. Your new saved information is:\n" + document.remember.split(config.separator).join("\n"));
    }
}

module.exports = {
    help: "Adds the text to the saved bot's information.\nIf no text is passed it shows the currently saved information",
    example: "/remember You are talking inside the police station",
    has_argument: true,
    action: remember
}
