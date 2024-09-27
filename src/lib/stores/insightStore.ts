import { writable } from 'svelte/store';

export const trends_selected_ad = writable('ad_insights');
export const trends_selected_post = writable('post_insights');

export const timePeriod = writable('7days');
