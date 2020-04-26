const sessionInit = require('./startup/session_init');

const commands = require('./commands');

const timestamp = Math.floor(Date.now() / 1000);

module.exports = async (ctx) => {
    let session = ctx.session;
    let message = ctx.message;

    if (message.date < timestamp)
        return;

    else if (session.document == null)
        await sessionInit(ctx);

    if (message.text.startsWith("/")) {

        let command = message.text.slice(0,9).split(' ')[0];
        let argument = message.text.replace(command,"").trim();

        switch (command) {
            case '/remember':
                await commands.remember(ctx, argument);
                break;
            case '/forget':
                await commands.forget(ctx);
                break;
            case '/prompt':
                await commands.prompt(ctx, argument);
                break;
            case '/revert':
                await commands.revert(ctx);
                break;
            case '/alter':
                await commands.alter(ctx, argument);
                break;
            case '/continue':
                await commands.continue(ctx);
                break;
            default:
                await commands.help(ctx);
        }
    } else {
        await commands.response(ctx);
    }

    console.log(session.document.remember);
}