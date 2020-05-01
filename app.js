const Telegraf = require('telegraf');
const session = require('telegraf/session')
const mongoose = require('mongoose');
const messageHandler = require('./core/message_handler');
const databaseInit = require('./core/startup/database_init');

mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true});
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(session());

bot.start(databaseInit);
bot.on('text', messageHandler);

bot.on('sticker', (ctx) => ctx.reply('ME NO LIKE STICKERS :('));
bot.on('audio', (ctx) => ctx.reply('I HAVE NO EARS :('));
bot.on('photo', (ctx) => ctx.reply('I HAVE NO EYES :('));
bot.on('document', (ctx) => ctx.reply('I HAVE NO READ :('));

bot.launch();
