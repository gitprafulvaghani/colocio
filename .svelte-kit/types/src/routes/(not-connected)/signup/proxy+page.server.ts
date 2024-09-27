// @ts-nocheck
import type { Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  register: async ({ request, locals: { colocio }, url }: import('./$types').RequestEvent) => {
    // check if we're dealing with provider logins
    const provider = url.searchParams.get('provider') as Provider;
    if (provider) {
      const redirectURL = await colocio.oAuthSignin(provider);
      if (redirectURL) {
        redirect(303, redirectURL);
      }

      fail(402, { message: 'Error during signup process...' });
    } else {
      //TODO: Check form entires
      const body = Object.fromEntries(await request.formData());

      let signUpResponse = false;
      try {
        signUpResponse = await colocio.signUp(
          body.email as string,
          body.password as string
        );
      } catch (error) {
        return { success: false, data: { message: error.message } };
      }

      // check if we should redirect user to the root
      if (signUpResponse) {
        redirect(303, '/');
      }

      return { success: true };
    }
  },
};
;null as any as Actions;