import { getColocioInstance } from '$lib/services/ColocioInstance';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const colocioInit: Handle = async ({ event, resolve }) => {
  event.locals.colocio = getColocioInstance(event);
  console.log('<Handle> Resolving initialization...');

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
};

// REDIRECT LOGIC
const redirects: Handle = async ({ event, resolve }) => {
  console.log('<Handle> Redirects triggered...');

  // Try to get active user
  const activeUser = await event.locals.colocio.getCurrentUser();
  console.log('\t<HOOKS:Redirect> Active userID: ', activeUser?.id);
  console.log('\t<HOOKS:Redirect> Active page: ', event.url.pathname);

  //   Routes that do not require redirects
  const routesWithoutRedirect = [
    '/login',
    '/signup',
    '/reset-password',
    '/auth/callback',
    '/auth/auth-code-error',
    '/onboarding',
  ];

  //  //   Check if the current page requires redirect due to no active user
  //  if (
  //    !activeUser &&
  //    !routesWithoutRedirect.includes(event.url.pathname) &&
  //    !event.url.pathname.startsWith('/api')
  //  ) {
  //    console.log('<HOOKS:Redirect> No active user, REDIRECTING to => /login');
  //    redirect(303, '/login');
  //  }

  // Auto-redirect for login or signup page if the user is already logged in
  if (activeUser && ['/login', '/signup'].includes(event.url.pathname)) {
    console.log('<HOOKS:Redirect> Session exists, REDIRECTING to => (root)/');
    redirect(303, '/');
  }

  // Check user onboarding status
  // TODO: Keep this commneted out until the onboarding roue is working
  // if (activeUser) {
  //   const result = await event.locals.colocio.storage.getOnboardingStatus(
  //     activeUser.id
  //   );
  //   console.log(`UserID: ${activeUser.id} onboarding status: ${result}`);
  //
  //   if (['started', 'not_started'].includes(result)) {
  //     console.log(
  //       '<HOOKS:Redirect> Active user but not onboarded, REDIRECTING to => /onboarding'
  //     );
  //     redirect(303, '/onboarding');
  //   }
  // }

  // Resolve the event as normal if no redirects are needed
  return resolve(event);
};

// EXPORT FINAL SEQUENCE OF HANDLES
export const handle = sequence(colocioInit, redirects);
