import * as Discord from 'discord.js';
import BotCommands from './commands';
import logger from '../utils/logger.winston';
import * as minimist from 'minimist';
//https://www.npmjs.com/package/minimist

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
    logger.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.content.indexOf('!') !== 0) return;

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();

    //@ts-ignore
    if (!bot.commands.has(command)) return;

    const argsObj = minimist(args);

    try {
        //@ts-ignore
        bot.commands.get(command).execute(msg, argsObj);
    } catch (error) {
        logger.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});