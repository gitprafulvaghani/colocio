import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, request }) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);

    const code = params.get('code');
    if (code) {
        console.log('code =>', code);
        const { data, error } =
            await locals.supabase.auth.exchangeCodeForSession(code);
    }

    return new Response();
};
