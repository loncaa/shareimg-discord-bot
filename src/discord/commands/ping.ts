import { Message } from 'discord.js';

export default {
    name: '!ping',
    description: 'Ping!',
    execute: (msg: Message, args) => {
        msg.reply('pong');
        msg.channel.send('pong');
    }
};