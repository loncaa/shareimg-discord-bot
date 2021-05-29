const configs = [];

function setConfig(admin_id, page_id, access_token) {
    configs.push({ admin_id, page_id, access_token })
}

function getConfig(admin_id) {
    const index = configs.findIndex((val) => val.admin_id === admin_id);

    if (index === -1) return null;
    return configs[index];
}

export default {
    setConfig,
    getConfig,
    configs
}