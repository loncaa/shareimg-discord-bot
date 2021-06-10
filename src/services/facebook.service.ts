import axios from 'axios';
import { fb_config } from '../db/models';
import logger from '../utils/logger.winston';

const API_URL = "https://graph.facebook.com/v10.0"

function publish(admin_id, url, description) {
    const config = fb_config.getConfig(admin_id);

    const unescapedURI = `${API_URL}/${config.page_id}/feed?message=${description}&link=${url}&access_token=${config.access_token}`;

    return axios.post(encodeURI(unescapedURI)).catch(error => {
        logger.error(error.message);
    })
}

function retrieveAccessToken(code) {
    return axios.get(API_URL + '/oauth/access_token', {
        params: {
            client_id: process.env['FB_APP_ID'],
            client_secret: process.env['FB_APP_SECRET'],
            redirect_uri: process.env['BASE_URI'] + '/v1/fb/auth/c/',
            code,
        }
    })
}

export {
    retrieveAccessToken,
    publish
}