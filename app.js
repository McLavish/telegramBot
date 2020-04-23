const Telegraf = require('telegraf');
const axios = require('axios');
const session = require('telegraf/session')
const mongo = require('./db/mongo')

const token = "917033187:AAExsnknV2nQmH-oYEDH0eskojjJZD4T8uM";
const bot = new Telegraf(token)
const timestamp = Math.floor(Date.now() / 1000);

mongo.test();

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

bot.on('text', async (ctx) => {
   console.log(ctx.message);
   if ( ctx.message.date < timestamp) {
      return;
   }
   if (!ctx.session.context) {
      console.log("Assigned session variable of user " + ctx.message.from.id);
      ctx.session.context = "Me: Hello, how are you?\n";
   }
   if (ctx.session.remember)
   {
      ctx.session.context = ctx.message.text + "\n" + ctx.session.context;
      return;
   }

   try {
      let modifiedPrompt = `${ctx.session.context}You: ${ctx.message.text}\nMe: `;

      let response = await axios.post('https://6f45ce70.ngrok.io/predict', {
         prompt: modifiedPrompt,
         length: 60,
         timeout: 5000
      });

      console.log(response);

      let filteredText = filterResponse(response.data.result);

      await ctx.reply(filteredText || "...");

      let lines = modifiedPrompt.split("\n");

      console.log(lines);

      ctx.session.context = lines.length > 5 ? lines.slice(-5).join('\n') : modifiedPrompt;
      ctx.session.context += filteredText;

      console.log(ctx.session.context);
   } catch (e) {
      console.log(e);
      await ctx.reply("Sorry, the BOT isn't able to fullfil your request at this time")
   }
});

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.launch()

function filterResponse(rawText) {
   rawText = rawText.substring(0, rawText.indexOf("You:"));
   if (rawText.indexOf("Me:") !== -1)
      rawText = rawText.substring(0, rawText.indexOf("Me:"));
   //rawText = rawText.endsWith("\n") ? rawText.substring(0, rawText.length - 1) : rawText;
   return rawText;
}