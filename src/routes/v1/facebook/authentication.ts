import * as express from 'express';
import { retrieveAccessToken } from '../../../services/facebook.service';
import { generateFacebookAppURI } from '../../../utils/fb.utils';

import logger from '../../../utils/logger.winston';


const router = express.Router();

router.get('/auth/c', async (req, res) => {

    const { code } = req.query;

    if (!code) {
        return res.sendStatus(200);
    }

    logger.debug(`The code is: ${code}`);

    const data = await retrieveAccessToken(code);
    logger.debug(`The data is: ${data}`);

    res.sendStatus(200);
});

router.post('/deauth', (req, res) => {
    res.sendStatus(200);
});

router.get('/auth', (req, res) => {
    const facebookLoginUrl = generateFacebookAppURI();
    res.json({ url: facebookLoginUrl });
});

export default router;