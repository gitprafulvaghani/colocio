import { ColocioImplementation, INVALIDATION_IDENTIFIER } from '$lib/services/ColocioService';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import type { LayoutLoad } from './$types'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const load: LayoutLoad = async ({ depends, parent, data }) => {
  await parent();
  // const { _createClientReference, _session } = data;
  // const { _locals, _session } = data;
  // const { _colocioReference, _session } = data;
  depends(INVALIDATION_IDENTIFIER);
  
  console.log("Main:Layout client load.");

  const _supaBrowser = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: {
      fetch,
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data._session)
        }

        const cookie = parse(document.cookie)
        return cookie[key]
      },
    },
  })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  // const {
  //   data: { session },
  // } = await _supaBrowser.auth.getSession()
  

  return { 
    _supaBrowser,
    // session,
  }
}