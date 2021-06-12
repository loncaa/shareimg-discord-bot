import axios from 'axios';
import logger from '../../utils/logger.winston';

const API_URL = process.env['FB_API_URI'];

function fetchMeData(access_token) {
    const unescapedURI = `${API_URL}/me?fields=name,id&access_token=${access_token}`;

    return axios.post(encodeURI(unescapedURI)).catch(error => {
        logger.error(error.message);

        return error;
    })
}

export {
    fetchMeData
}