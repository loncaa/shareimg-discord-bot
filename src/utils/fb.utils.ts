import * as queryString from 'query-string';

export function generateFacebookAppURI(){
    const stringifiedParams = queryString.stringify({
        client_id: process.env['FB_APP_ID'],
        redirect_uri: process.env['BASE_URI'] + '/v1/fb/auth/c',
        scope: ['email'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
}