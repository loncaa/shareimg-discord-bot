import { Message } from "discord.js";
import { generateFacebookAppOauthURI } from '../../utils/fb.utils';

//initialize facebook api
export default {
    name: "!init",
    description: "Initialize Social Media Proxy APP",
    execute: (msg: Message, args) => {

        if(args['f'] || args['facebook']){
            const admin_id = msg.author.id;
            msg.reply(`Click on link to add facebook app: ${generateFacebookAppOauthURI(admin_id)}`);
        }
    }
}