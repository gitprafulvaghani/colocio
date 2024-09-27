import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { FacebookService } from '$lib/services/FacebookService';

export const load: PageServerLoad = async event => {
  const FB = new FacebookService(event);
  await FB.init();
};
