import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
    PRIVATE_FACEBOOK_APP_ID,
    PRIVATE_FACEBOOK_APP_SECRET,
    PRIVATE_FACEBOOK_API_VERSION,
} from '$env/static/private';

export const POST: RequestHandler = async ({ request, locals }) => {
    try {
        const session = await locals.getSession();
        if (!session) {
            redirect(301, '/login');
        }

        const userID = session.user.id;
        const { shortLivedToken } = await request.json();
        const response = await fetch(
            `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/oauth/access_token?` +
                `grant_type=fb_exchange_token&` +
                `client_id=${PRIVATE_FACEBOOK_APP_ID}&` +
                `client_secret=${PRIVATE_FACEBOOK_APP_SECRET}&` +
                `fb_exchange_token=${shortLivedToken}`
        );

        if (!response.ok) {
            console.error('An error occurred', response);
            return json('An error occurred, could not exchange token', {
                status: 500,
            });
        }

        const longLivedToken = await response.json();
        const facebookUserToken: DB.access_tokens = {
            uuid: userID,
            provider: 'facebook',
            type: 'user',
            access_token: longLivedToken.access_token,
            // TODO: longLivedToken.expires_in is in seconds from now, we
            // need to convert it to a timestamp. Data type in the
            // database is text. Need to change it to timestamp.
            // Important: it could also be null, which means it never
            // expires.
            expires_at: longLivedToken.expires_in,
        };

        const { error: err } = await locals.supabase
            .from('access_tokens')
            .upsert(facebookUserToken);

        if (err) {
            console.error('An error occurred', err);
            throw new Error('An error occurred, could not save token');
        }

        return json(longLivedToken, { status: 201 });
    } catch (e) {
        if (e instanceof Error) {
            console.error('An error occurred in the POST handler:', e);
            return json({ error: e.message }, { status: 500 });
        } else {
            console.error('An error occurred in the POST handler:', e);
            return json(
                { error: 'An unknown error occurred' },
                { status: 500 }
            );
        }
    }
};
