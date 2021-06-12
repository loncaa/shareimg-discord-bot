import axios from 'axios';
import logger from '../../utils/logger.winston';

const API_URL = process.env['FB_API_URI'];

function listUserAccounts(user_id, access_token) {
    const unescapedURI = `${API_URL}/${user_id}/accounts?access_token=${access_token}`;

    return axios.get(encodeURI(unescapedURI)).catch(error => {
        logger.error(error.message);

        return error;
    })
}

function fetchMeData(access_token) {
    const unescapedURI = `${API_URL}/me?fields=id&access_token=${access_token}`;

    return axios.post(encodeURI(unescapedURI)).catch(error => {
        logger.error(error.message);

        return error;
    })
}

export {
    fetchMeData,
    listUserAccounts
}