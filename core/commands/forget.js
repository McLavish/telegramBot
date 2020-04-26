module.exports = async (ctx) => {
    let document = ctx.session.document;

    document.remember = "";

    await ctx.reply("Your saved information has been erased!")
}