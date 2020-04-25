const Telegraf = require('telegraf');
const session = require('telegraf/session')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true});

const databaseInit = require('./core/startup/database_init')

const token = "917033187:AAExsnknV2nQmH-oYEDH0eskojjJZD4T8uM";
const bot = new Telegraf(token)

bot.use(session())

bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.command('quit', (ctx) => {
    // Using context shortcut
    ctx.leaveChat()
})

bot.start(databaseInit);

bot.on('text', core.message);

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch()