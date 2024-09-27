import type {
  AccessTokenResponse,
  StatusResponse,
} from '$types/facebookAccounts';
import { writable } from 'svelte/store';

type socialSignedInType = {
  facebook: { success: boolean; data: [] | null; error: string };
  google: { success: boolean; data: any; error: string };
};
export const socialSignedIn = writable({
  facebook: { success: false, data: null, error: '' },
  google: { success: false, data: null, error: '' },
});

export const accounts = writable([]);
export const audience = writable({
  name: null,
  age: {
    min: null,
    max: null,
  },
  gender: null,
  locations: [],
  methods: [],
  painPoints: [],
  interests: [],
  description: null,
  lifetime_value: null,
});

export const duplicate = writable(false);
export const paymentPackage = writable('');
export const paymentSimpleID = writable(null);
export const paymentBasicID = writable(null);
export const paymentProID = writable(null);
export const onboardingComplete = writable(false);
export const facebookResponse = writable<StatusResponse | null>(null);
export const longLivedToken = writable<AccessTokenResponse | null>(null);
