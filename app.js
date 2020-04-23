const Telegraf = require('telegraf');
const session = require('telegraf/session')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true});
const core = require('./core/events')

const token = "917033187:AAExsnknV2nQmH-oYEDH0eskojjJZD4T8uM";
const bot = new Telegraf(token)

bot.use(session())

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))

bot.command('remember', (ctx) => {
      if (!ctx.session.remember) {
         ctx.reply('Attention, the Bot has entered in Remember mode!\n' +
             'All your following lines will be inserted in the context permanent memory.' +
             '\nUse this command again to exit this mode');
      }
       ctx.session.remember = !ctx.session.remember;
       console.log(ctx.session.remember);
    });
//EEH
bot.on('text', core.message);

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch()

function filterResponse(rawText) {
   rawText = rawText.substring(0, rawText.indexOf("You:"));
   if (rawText.indexOf("Me:") !== -1)
      rawText = rawText.substring(0, rawText.indexOf("Me:"));
   //rawText = rawText.endsWith("\n") ? rawText.substring(0, rawText.length - 1) : rawText;
   return rawText;
}