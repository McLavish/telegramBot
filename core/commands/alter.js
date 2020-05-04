const config = require('../config');
const filterInput = require('../utils/filter_input');

async function alter(ctx, argument) {
    let document = ctx.session.document;
    argument = filterInput(argument,config.separator);
    let lines = document.context.split(config.separator);

    //Take the last element and check if it's an empty string. (Empty string are generated because the separator is always appended at the end of the context)
    if(lines.slice(-1).pop().trim().length === 0)
        //Remove the empty string
        lines.pop();

    let oldLine = lines.pop();
    //Calculate the longest alias
    let aliasMaxLength = config.botAlias.length > config.userAlias.length ? config.botAlias.length : config.userAlias.length;
    //Narrow down the string to the longest alias
    let filter = oldLine.substring(0,aliasMaxLength);
    //Find the alias
    let alias = filter.includes(config.botAlias) ? config.botAlias : config.userAlias;
    //Rebuild the string with the edited text.
    let newLine = alias + " " + argument;

    lines.push(newLine);
    //Always add the separator after the context
    document.context = lines.join(config.separator) + config.separator;
    await document.dbSave();

    await ctx.reply("You have successfully changed the previous line");
}

module.exports = {
    help: "Modifies the last line in the conversation, replacing either your reply or the bot's reply with the new text",
    example: "/alter This is my new line!",
    has_argument: true,
    action: alter
};
