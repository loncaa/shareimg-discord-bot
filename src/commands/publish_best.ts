import { Message } from 'discord.js';

export default {
    name: '!publishbest',
    description: 'Count likes of messages with attachment and publish one with highest number of likes!',
    execute: (msg: Message, args) => {
        msg.channel.messages.fetch({ limit: 100 }).then(messages => {
            const response = {
                url: undefined,
                likes: 0,
                message: undefined
            };

            if(messages.size === 0) return;

            messages.each(message => {
                if (message.attachments.size == 0) return;

                let likes = 0;

                message.reactions.cache.each(reaction => {
                    if (reaction.emoji.name === '👍') {
                        likes = reaction.count;
                    }
                })

                if(likes < response.likes) return;
                response.likes = likes;

                message.attachments.each(attachment => {
                    response.url = attachment.url;
                })

                response.message = message.content;
            });

            console.log(response);

            msg.channel.send(`Likes ${response.likes}, description: ${response.message} ${response.url}`);
            //archive all previously posted messages
            //send published content to another channel
        });
    }
};