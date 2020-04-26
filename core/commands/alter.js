const config = require('../config');

module.exports = async (ctx, argument) => {
    let document = ctx.session.document;

    let lines = document.context.split(config.separator);

    //Takes the last element from lines and checks for an empty string
    if(lines.slice(-1).pop().trim().length === 0)
        lines.pop();

    let oldLine = lines.pop();

    //Prendo la lunghezza dell'alias più lungo
    let aliasMaxLength = config.botAlias.length > config.userAlias.length ? config.botAlias.length : config.userAlias.length;

    //Filtro la stringa
    let filter = oldLine.substring(0,aliasMaxLength);

    //Imposto l'alias
    let alias = filter.includes(config.botAlias) ? config.botAlias : config.userAlias;

    let newLine = alias + " " + argument + config.separator;

    lines.push(newLine);

    document.context = lines.join(config.separator);
    await document.dbSave();

    await ctx.reply("You have successfully changed the previous line");
}