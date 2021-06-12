import { Message } from "discord.js";
import { generateFacebookAppOauthURI } from '../../utils/fb.utils';

//initialize facebook api
export default {
    name: "!init",
    description: "Initialize Social Media Proxy APP",
    execute: (msg: Message, args) => {

        args.forEach((element, index) => {
            if (element === '--fb') {
                if (args.length >= index) {
                    const admin_id = msg.author.id;

                    msg.reply(`Click on link to add facebook app: ${generateFacebookAppOauthURI(admin_id)}`);
                }
            }
        });

        //check what user want to initialise: fb, ig, etc
        //replay him in discord with steps, or with error message

        //send user a lik where to click if he wants to add facebook app
        //when user creates app, store that data in database (webhook) and replay him that app is stored
        //create long lasting token and refresh token every one month
        //show him a commands and descriptino of every command
    }
}