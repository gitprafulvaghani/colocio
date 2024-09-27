// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { FacebookService } from '$lib/services/FacebookService';

export const load = async( event: Parameters<PageServerLoad>[0]) => {
  const FB = new FacebookService(event);
  await FB.init();
};
