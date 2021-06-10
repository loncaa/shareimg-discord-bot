import { Message } from 'discord.js';

export default {
    name: '!kick',
    description: 'Kick!',
    execute: (msg: Message, args) => {
        if (msg.mentions.users.size) {
            const taggedUser = msg.mentions.users.first();
            msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
          } else {
            msg.reply('Please tag a valid user!');
          }
    }
};