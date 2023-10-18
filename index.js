const { Console } = require('console')
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const fs = require('fs');
const ytdl = require('ytdl-core');

const bot = new Telegraf('6393853527:AAGvzuedwxqbmrSYIf4QtmarTjcLDRFy2zM');

bot.start((ctx) => ctx.reply('Hola Rey'));

bot.command('help', (ctx) => {
    const mensaje = `Usuario: ${ctx.from.username}\nTexto: ${ctx.message.text}`
    ctx.reply(mensaje)
});

bot.hears(/.*youtu.*/, async (ctx) => {
    const url = ctx.message.text;

    await ctx.reply('Descargando video...');
    const info = await ytdl.getInfo(url);

    ytdl(url, {quality : 'highestvideo'})
    .pipe(fs.createWriteStream(`${info.videoDetails.title}.mp4`));

    await ctx.reply('Finalizado, enviando...')
});

bot.launch();