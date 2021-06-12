import * as queryString from 'query-string';

export function generateFacebookAppOauthURI(userId = null) {
    const stringifiedParams = queryString.stringify({
        client_id: process.env['FB_APP_ID'],
        redirect_uri: process.env['BASE_URI'] + '/v1/fb/auth/c',
        scope: ['email','pages_manage_metadata', 'pages_manage_posts'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
        state: `{ "uid": ${userId} }`
    });

    return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
}