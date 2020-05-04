const commands = require('../commands');

let helps = [];
loadHelps(helps);

function loadHelps(array){
    for (let name in commands) {
        let command = commands[name];
        array.push({
            name: name,
            text: command.help,
            example: command.example,
            has_argument: !!command.has_argument
        });
    }
}

async function helpCommand(ctx, command) {

    if (command) {
        let message = command.example ? command.text + "\n\nExample:\n" + command.example : command.text;
        await ctx.reply(message);
    }
    else {
        let help = "Command not found\n" +
            "Use '/help <command_name>' to view a command definition\n" +
            "Type '/help' to get a list of all commands";
        await ctx.reply(help);
    }
}

async function helpAll(ctx) {
    let help = "The following commands are available:\n";

    helps.forEach( (command) => {
        help += "/" + command.name;
        help += command.has_argument ? " <text>\n" : "\n";
    });

    help += "Use /help <command_name> to view futher information about a command";
    await ctx.reply(help);
}

module.exports = async (ctx, argument = "") => {

    if (argument){
        let command = helps.find( (element) => element.name === argument);
        await helpCommand(ctx, command);
    } else {
        await helpAll(ctx);
    }
};
