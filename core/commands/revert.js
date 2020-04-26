const config = require('../config');

module.exports = async (ctx) => {
    let document = ctx.session.document;

    let lines = document.context.split(config.separator);
    console.log(lines);

    //Takes the last element from lines and checks for an empty string
    if(lines.slice(-1).pop().trim().length === 0)
        lines.pop();

    if (lines.length <= 1)
        await ctx.reply("All lines already deleted!")

    else {
        lines.pop();
        document.context = lines.join(config.separator) + config.separator;
        await document.dbSave();
        await ctx.reply("Previous line deleted!")
    }
    console.log(lines);
}