import { goto } from '$app/navigation';
import {
    PUBLIC_PEACH_ACCESS_TOKEN,
    PUBLIC_PEACH_ENTITY_ID,
    PUBLIC_PEACH_URL,
} from '$env/static/public';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import queryString from 'query-string';

export const GET: RequestHandler = async ({ request, locals }) => {
    console.log('GET /api/payments');
    const session = await locals.getSession();
    if (!session) {
        redirect(301, '/login');
    }

    try {
        let params = new URL(request.url).searchParams;
        let id = params.get('id');

        const req = async () => {
            let response;
            const data = {
                entityId: PUBLIC_PEACH_ENTITY_ID,
            };

            const URL =
                PUBLIC_PEACH_URL +
                '/v1/checkouts/' +
                id +
                '/registration?' +
                queryString.stringify(data);
            const r = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Bearer ' + PUBLIC_PEACH_ACCESS_TOKEN,
                },
            })
                .then(r => r.json())
                .then(r => {
                    response = r;
                })
                .catch(error => {
                    console.error('Error', error);
                    throw new Error('Failed to fetch data');
                });
            return response;
        };

            const res = await req();
            if (res && res?.resultDetails?.StatusDetails == 'Success') {
                let { data, error } = await locals.supabase
                .from('user_profile')
                .update({
                    payment_registration: res,
                })
                .eq('uuid', session?.user.id)
                .select('*');

            if (error) {
                console.error('Error inserting data:', error.message);
                throw new Error('Could not create payment registration');
            }

            return json({
                status: 200,
                body: { message: res },
            });
        } else {
            return json({
                status: 500,
                body: { message: res },
            });
        }
    } catch (error) {
        console.log(error);
    }

    return json({
        status: 500,
        body: { message: 'Something went wrong' },
    });
};
