import * as express from 'express';
import { fb_config } from '../../../db/models'
import { retrieveAccessToken, retrieveLongLivedAccessToken, retrievePageAccessToken } from '../../../services/facebook/auth.service';
import { fetchMeData, listUserAccounts } from '../../../services/facebook/user.service';

const router = express.Router();

router.get('/auth/c', async (req, res) => {

    const { code, state } = req.query;
    const parsedState = JSON.parse(state);

    if (!code) {
        return res.sendStatus(200);
    }

    const accessTokenResponse = await retrieveAccessToken(code);
    const { access_token } = accessTokenResponse.data;

    const longLivedAccessTokenResponse = await retrieveLongLivedAccessToken(access_token);
    const { access_token: long_lived_access_token } = longLivedAccessTokenResponse.data;

    const meResponse = await fetchMeData(long_lived_access_token);
    const { id } = meResponse.data;
    const accountsListResponse = await listUserAccounts(id, long_lived_access_token);
    const { data: { data: list }} = accountsListResponse;

    if(list.length > 0){
        const { id, name, access_token } = list[0];
        fb_config.setConfig(parsedState.uid, id, access_token);
    } else{
        fb_config.setConfig(parsedState.uid, null, long_lived_access_token);
    }

    res.status(200).render('index', { title: 'Hey', message: 'You authorized your facebook page!' });
});

router.post('/deauth', (req, res) => {
    res.sendStatus(200);
});

export default router;