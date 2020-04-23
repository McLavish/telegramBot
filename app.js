const Telegraf = require('telegraf');
const session = require('telegraf/session')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true});
const core = require('./core/events')

const apa = require('./checkThings')

const token = "917033187:AAExsnknV2nQmH-oYEDH0eskojjJZD4T8uM";
const bot = new Telegraf(token)

bot.use(session())

bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.command('quit', (ctx) => {
    // Using context shortcut
    ctx.leaveChat()
})

bot.start(apa);


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