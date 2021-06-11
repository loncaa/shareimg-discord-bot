const configs = [];

function setConfig(admin_id, page_id, access_token) {
    const index = configs.findIndex((val) => val.admin_id === parseInt(admin_id));
    const config =  { admin_id, page_id, access_token };

    if (index === -1) configs.push(config)
    else configs[index] = config;

    return config;
}

function getConfig(admin_id) {
    const index = configs.findIndex((val) => val.admin_id === parseInt(admin_id));

    if (index === -1) return null;
    return configs[index];
}

export default {
    setConfig,
    getConfig,
    configs
}