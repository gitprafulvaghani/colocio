import { redirect } from '@sveltejs/kit';

//TODO: Rework...
export const GET = async event => {
  // deconstruct url from the current event
  const { url } = event;
  const code = url.searchParams.get('code');
  if (code) {
    const colocioService = event.locals.colocio;
    const result = await colocioService.processOAuthCode(code);
    if (result.data) {
      redirect(303, '/');
    }
  }

  // return the user to an error page with instructions
  redirect(404, '/auth/auth-code-error');
};
