import * as dotenv from 'dotenv';
dotenv.config();

import './discord/discord.bot';
import './express.server';

process.on('unhandledRejection', (reason, promise) => {
    //@ts-ignore
    console.log('Unhandled Rejection at:', reason.stack || reason);
    console.log('Promise: ', promise);
  })
  