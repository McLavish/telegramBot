const config = require('../config');
const filterInput = require('../utils/filter_input');

async function remember (ctx, argument) {
    let document = ctx.session.document;
    argument = filterInput(argument,config.separator);

    if (!argument) {
        let message = document.remember ? "Your saved information is:\n"
            + document.remember.split(config.separator).join("\n") : "You don't have anything saved";
        await ctx.reply(message);
        return;
    }

    let newRemember = document.remember + argument + config.separator;

    if (newRemember.length > config.maxRememberChars){
        await ctx.reply(`Your saved information cannot exceed ${config.maxRememberChars} characters`);
        return;
    }

    document.remember = newRemember;
    await document.dbSave();
    await ctx.reply("Updated successfully. Your new saved information is:\n" + document.remember.split(config.separator).join("\n"));
}

module.exports = {
    help: "Adds the text to the saved bot's information.\nIf no text is passed it shows the currently saved information",
    example: "/remember You are talking inside the police station",
    has_argument: true,
    action: remember
};
