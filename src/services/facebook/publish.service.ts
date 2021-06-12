import axios from 'axios';
import { fb_config } from '../../db/models';
import logger from '../../utils/logger.winston';

const API_URL = process.env['FB_API_URI'];

function publish(admin_id, url, description) {
    const config = fb_config.getConfig(admin_id);

    const unescapedURI = `${API_URL}/${config.page_id}/feed?message=${description}&link=${url}&access_token=${config.access_token}`;

    return axios.post(encodeURI(unescapedURI)).catch(error => {
        logger.error(error.message);

        return error;
    })
}

export {
    publish
}