import * as express from 'express';
import { fb_config } from '../../../db/models'
import { retrieveAccessToken, retrieveLongLivedAccessToken, retrievePageAccessToken } from '../../../services/facebook/auth.service';
import { generateFacebookAppOauthURI } from '../../../utils/fb.utils';

import logger from '../../../utils/logger.winston';


const router = express.Router();

router.get('/auth/c', async (req, res) => {

    const { code, state } = req.query;
    const parsedState = JSON.parse(state);

    if (!code) {
        return res.sendStatus(200);
    }

    logger.debug(`The code is: ${code}`);

    const accessTokenResponse = await retrieveAccessToken(code);
    const { access_token } = accessTokenResponse.data;

    const longLivedAccessTokenResponse = await retrieveLongLivedAccessToken(access_token);
    const { access_token: long_lived_access_token } = longLivedAccessTokenResponse.data;

    if (parsedState.pageId) {
        const pageAccessTokenResponse = await retrievePageAccessToken(long_lived_access_token, parsedState.pageId);
        const { access_token: page_access_token } = pageAccessTokenResponse.data;

        fb_config.setConfig(parsedState.uid,  parsedState.pageId, page_access_token);
    }

    res.status(200).json(longLivedAccessTokenResponse.data);
});

router.post('/deauth', (req, res) => {
    res.sendStatus(200);
});

router.get('/auth', (req, res) => {
    const pageId = req.query.pid;

    const facebookLoginUrl = generateFacebookAppOauthURI(0, pageId);
    res.json({ url: facebookLoginUrl });
});

export default router;