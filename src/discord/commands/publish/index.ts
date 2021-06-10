import { Message } from 'discord.js';
import ArgsFunction from './args';

export default {
    name: '!publish',
    description: 'Publish selected image content!',
    execute: (msg: Message, args) => {
        const refMessageId = msg.reference.messageID;
        msg.channel.messages.fetch(refMessageId)
            .then(message => {

                const response = {
                    url: undefined,
                    likes: 0,
                    description: undefined
                };

                const hasMediaAttachment = message.attachments.size != 0 || message.embeds.length != 0;
                if (!hasMediaAttachment) {
                    message.reply('Message does not have media attachment.');
                    message.react('👎');
                    return;
                };

                let likes = 0;
                let isPublished = false;

                message.reactions.cache.each(reaction => {

                    if (reaction.emoji.name === '👍') {
                        likes = reaction.count;
                    } else if (reaction.emoji.name === '📨') {
                        isPublished = true;
                    }
                })

                if (isPublished) {
                    message.reply('Content already published.')
                    return
                }

                if (likes < response.likes) return;

                response.likes = likes;

                if (message.attachments.size > 0) {
                    message.attachments.each(attachment => {
                        response.url = attachment.url;
                    })
                } else if (message.embeds.length > 0) {
                    message.embeds.forEach(messageEmbed => {
                        response.url = messageEmbed.url;
                    })
                }

                response.description = message.content;

                message.react('📨');
                msg.channel.send(`Likes ${response.likes}, description: ${response.description} ${response.url}`);

                args.forEach((element, index) => {
                    if (element === '--desc') {
                        if (args.length >= index) {
                            response.description = args[index + 1] ? args[index + 1] : response.description;
                        }
                    } else if (element === 'ig' || element === 'fb') {
                        ArgsFunction[element].publish(msg.author.id, response.url, response.description);
                    }
                });
            });
    }
};