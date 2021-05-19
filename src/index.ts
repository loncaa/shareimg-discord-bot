import * as dotenv from 'dotenv';
import * as Discord from 'discord.js';

import BotCommands from './commands';

dotenv.config();
const bot = new Discord.Client();
//@ts-ignore
bot.commands = new Discord.Collection();

const TOKEN = process.env['TOKEN'];
bot.login(TOKEN);

Object.keys(BotCommands).map(key => {
    //@ts-ignore
    bot.commands.set(BotCommands[key].name, BotCommands[key]);
});

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();

    //@ts-ignore
    if (!bot.commands.has(command) || msg.author.bot) return;

    try {
        //@ts-ignore
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});