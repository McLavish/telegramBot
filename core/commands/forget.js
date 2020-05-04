async function forget (ctx) {
    let document = ctx.session.document;

    document.remember = "";
    await ctx.reply("Your saved information has been erased!");
}

module.exports = {
    help: "Deletes all the user saved information inserted with /remember",
    action: forget
};
