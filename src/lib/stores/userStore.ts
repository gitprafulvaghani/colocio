import { writable } from 'svelte/store';

export const userFBToken = writable<string>('');
export const userFBAdAccount = writable<string[]>([]);
export const onboardComplete = writable<boolean>(false);
