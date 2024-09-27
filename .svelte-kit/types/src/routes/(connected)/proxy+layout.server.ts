// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { INVALIDATION_IDENTIFIER } from '$lib/services/ColocioService';

export const load = async ({
  depends,
  locals: { colocio },
}: Parameters<LayoutServerLoad>[0]) => {
  // TODO: Synchronize with UI

  depends(INVALIDATION_IDENTIFIER);
  console.log('Main:Layout server load.');

  // pass the current session info for client processing
  return {
    _session: await colocio.getCurrentSession(),
  };
};

