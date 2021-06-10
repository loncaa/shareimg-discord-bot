import * as express from 'express';
import * as queryString from 'query-string';
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

    const urlParams = queryString.parse(req.search);

    logger.debug(`The code is: ${urlParams.code}`);

    res.sendStatus(200);
});

router.get('/auth/d', (req, res) => {


    res.sendStatus(200);
});

router.get('/auth', (req, res) => {
    const facebookLoginUrl = generateFacebookAppURI();
    res.json({ url: facebookLoginUrl });
});

export default router;