const sessionInit = require('./startup/session_init');
const commands = require('./commands');
const help = require('./commands/help');

const timestamp = Math.floor(Date.now() / 1000);

//This function handles the messages passed from the Telegram chat
module.exports = async (ctx) => {
    let session = ctx.session;
    let message = ctx.message;

    //Older messages before the bot was started are ignored
    if (message.date < timestamp)
        return;

    //If it's the first message an instance needs to be inizialized
    else if (session.document == null)
        await sessionInit(ctx);

    //Check if the message is a command. A command follows the structure: /<cmd_name> <cmd_argument>
    if (message.text.startsWith("/")) {
        /*
        Split the command in two parts:
        command = Slice takes the first 10 chars (/continuer is the longest with 10 chars). Split and [0] remove the argument after the command
        argument = Replace removes the command from the string
         */
        let command = message.text.slice(0,10).split(' ')[0];
        let argument = message.text.replace(command,"").trim();

        switch (command) {
            case '/remember':
                await commands.remember.action(ctx, argument);
                break;
            case '/forget':
                await commands.forget.action(ctx);
                break;
            case '/prompt':
                await commands.prompt.action(ctx, argument);
                break;
            case '/revert':
                await commands.revert.action(ctx);
                break;
            case '/alter':
                await commands.alter.action(ctx, argument);
                break;
            case '/continuer':
                await commands.continuer.action(ctx);
                break;
            default:
                await help(ctx, argument);
        }
    } else {
        //The bot replies to the query with a generated response
        await commands.response.action(ctx);
    }
}
