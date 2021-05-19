import { Message } from 'discord.js';

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
                    message: undefined
                };

                if (message.attachments.size == 0) return;

                let likes = 0;

                message.reactions.cache.each(reaction => {
                    if (reaction.emoji.name === '👍') {
                        likes = reaction.count;
                    }
                })

                if (likes < response.likes) return;
                response.likes = likes;

                message.attachments.each(attachment => {
                    response.url = attachment.url;
                })

                response.message = message.content;

                console.log(response);


                msg.channel.messages.delete(refMessageId);
                msg.channel.send(`Likes ${response.likes}, description: ${response.message} ${response.url}`);
                
                //publish to fb
                //archive this message
                //send published content to another channel
            });
    }
};