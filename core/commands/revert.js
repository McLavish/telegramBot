module.exports = async (ctx) => {
    let document = ctx.session.document;

    let lines = document.context.split('\n');
    console.log(lines);

    if(lines.slice(-1).pop().length === 0)
        lines.pop();

    if (lines.length <= 1)
        await ctx.reply("All lines already deleted!")

    else {
        lines.pop();
        document.context = lines.join('\n');
        await document.dbSave();
        await ctx.reply("Previous line deleted!")
    }
    console.log(lines);
}