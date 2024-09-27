import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals: { colocio } }) => {
  // The code is retrieved from the query parameter
  const code = url.searchParams.get('code');

  if (!code) {
    return error(400, 'No code provided');
  }

  // get the next URL from the query parameter
  // TODO: Check implementation
  const next = url.searchParams.get('next');
  const email = url.searchParams.get('email');
  const redirectTo = next + `?email=${email}`;

  // confirm password reset
  const success = await colocio.resetPassword(email);
  if (success) {
    console.log(
      `Password reset success. REDIRECTING => ${next ? redirectTo : '/'}`
    );
    redirect(303, next ? redirectTo : '/');
  } else {
    console.log('REDIRECTING (reset/+server.ts) => /login?errorcode=1');
    redirect(303, '/login?errorcode=1');
  }
};
