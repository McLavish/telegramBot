const response = require('./commands/response');
const help = require('./commands/help');
const remember = require('./commands/remember');
const sessionInit = require('./session_init');

const timestamp = Math.floor(Date.now() / 1000);

module.exports = async (ctx) => {
    let session = ctx.session;
    let message = ctx.message;

    console.log(ctx.message);

    if (message.date < timestamp)
        return;

    else if (session.document == null)
        await sessionInit(ctx);

    if (message.text.startsWith("/")) {
        let command = message.text.slice(10).split(' ')[0];
        switch (command) {
            case '/remember':
                await remember(ctx);
                break;
            case '/prompt':
                await prompt(ctx);
                break;
            default:
                await help(ctx);
        }
    } else {
        await response(ctx);
    }
}