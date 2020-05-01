const config = require('../config');

async function revert (ctx) {
    let document = ctx.session.document;

    let lines = document.context.split(config.separator);

    //Take the last element and check if it's an empty string. (Empty string are generated because the separator is always appended at the end of the context)
    if(lines.slice(-1).pop().trim().length === 0)
        lines.pop();

    //Always preserve the last line
    if (lines.length <= 1)
        await ctx.reply("All lines already deleted!")

    else {
        lines.pop();
        //Always add the separator after the context
        document.context = lines.join(config.separator) + config.separator;
        await document.dbSave();

        await ctx.reply("Previous line deleted!")
    }
}

module.exports = {
    help: "Deletes the previous line of the conversation from the Bot memory",
    action: revert
}
