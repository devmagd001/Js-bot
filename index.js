const { Console } = require('console')
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
const fs = require('fs');
const ytdl = require('ytdl-core');

const bot_token = '6393853527:AAGvzuedwxqbmrSYIf4QtmarTjcLDRFy2zM'
const bot = new Telegraf(bot_token);

bot.start((ctx) => ctx.reply('Hola Rey'));



bot.command('help', (ctx) => {
    const mensaje = `Usuario: ${ctx.from.username}\nTexto: ${ctx.message.text}`
    ctx.reply(mensaje)
});



bot.hears(/.*youtu.*/, async (ctx) => {
    const url = ctx.message.text;

    await ctx.reply('Descargando video...');
    const info = await ytdl.getInfo(url);

    ytdl(url, { quality: 'highestvideo' })
        .pipe(fs.createWriteStream(`${info.videoDetails.title}.mp4`))
        .on('finish', () => {
            ctx.reply('Enviando...')
            ctx.replyWithVideo({source : `./${info.videoDetails.title}.mp4`})
        })
});


setInterval(() => {
    fetch('www.google.com')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, 1000 * 60 * 60)

bot.launch();