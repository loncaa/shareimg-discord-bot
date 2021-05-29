import axios from 'axios';
import { fb_config } from '../db/models';

const API_URL = "https://graph.facebook.com/v10.0"

function publish(admin_id, url, description) {
    const config = fb_config.getConfig(admin_id);

    const unescapedURI = `${API_URL}/${config.page_id}/feed?message=${description}&link=${url}&access_token=${config.access_token}`;

    return axios.post(encodeURI(unescapedURI)).catch(error => {
        console.log(error.message);
    })
}

export {
    publish
}