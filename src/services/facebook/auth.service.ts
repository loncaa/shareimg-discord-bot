import axios from 'axios';
import logger from '../../utils/logger.winston';

const API_URL = process.env['FB_API_URI'];


function refreshAccessToken() {

}

function retrieveLongLivedAccessToken(access_token) {
    return axios.get(API_URL + '/oauth/access_token', {
        params: {
            grant_type: 'fb_exchange_token',
            client_id: process.env['FB_APP_ID'],
            client_secret: process.env['FB_APP_SECRET'],
            fb_exchange_token: access_token
        }
    }).catch(err => {
        const { data: { error } } = err.response;

        logger.error(`${error.code} ${error.error_subcode} ${error.message}`)

        return err.response;
    });
}

function retrieveAccessToken(code) {
    return axios.get(API_URL + '/oauth/access_token', {
        params: {
            client_id: process.env['FB_APP_ID'],
            client_secret: process.env['FB_APP_SECRET'],
            redirect_uri: process.env['BASE_URI'] + '/v1/fb/auth/c',
            code,
        }
    }).catch(err => {
        const { data: { error } } = err.response;

        logger.error(`${error.code} ${error.error_subcode} ${error.message}`)

        return err.response;
    });
}

function retrievePageAccessToken(access_token, page_id) {
    return axios.get(API_URL + `/${page_id}`, {
        params: {
            fields: "access_token",
            access_token: access_token
        }
    }).catch(err => {
        const { data: { error } } = err.response;

        logger.error(`${error.code} ${error.error_subcode} ${error.message}`)

        return err.response;
    });
}

export {
    retrieveAccessToken,
    retrieveLongLivedAccessToken,
    retrievePageAccessToken
}