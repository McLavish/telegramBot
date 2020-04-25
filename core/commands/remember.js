module.exports = async (ctx) => {
    ctx.session.mongoUser.context = ctx.message.text + "\n" + ctx.session.mongoUser.context;
}