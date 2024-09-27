import { type Provider } from '@supabase/supabase-js';
import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { AuthenticationError } from '$lib/services/ColocioErrors';

export const actions: Actions = {
  login: async ({ request, locals: { colocio }, url }) => {
    // check if we're dealing with based provider login
    const provider = url.searchParams.get('provider') as Provider;
    if (provider) {
      var oAuthRedirectURL = '';
      try {
        oAuthRedirectURL = await colocio.oAuthSignin(provider);
      } catch (error) {
        return fail(501, { message: `OAuth Error: ${error.message}` });
      }

      // inspect result
      if (oAuthRedirectURL) {
        redirect(303, oAuthRedirectURL);
      }
    } else {
      // Converting the form data from the request to an object
      const body = Object.fromEntries(await request.formData());

      // get overall signin result
      let success = false;
      try {
        success = await colocio.signIn(
          body.email as string,
          body.password as string
        );
      } catch (error) {
        return fail(501, { message: `Error: ${error.message}` });
      }

      // inspect the results
      if (success) {
        // If there is no error, redirect to the root path
        redirect(302, '/');
      }
    }
  },

  // TODO: Rework later
  // resetPassword: async ({ request, locals: { colocio } }) => {
  //     // Converting the form data from the request to an object
  //     const body = Object.fromEntries(await request.formData());
  //     const email = body.email as string;

  //     //TODO: Process errors in a better way
  //     const success = colocio.resetPassword(email);
  //     if(!success) {
  //         fail(502, { message: "We're generally okay, but your password reset confused us big time..."});
  //     }

  //     redirect(303, '/login?resetsent=1');
  // },
};
