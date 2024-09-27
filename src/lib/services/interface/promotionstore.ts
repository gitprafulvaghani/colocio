import { writable } from 'svelte/store';
import type { AudienceInfos } from './promotions';

export const Button_text_options_Store = writable([
  { value: 'No button', label: 'No button' },
  { value: 'Learn More', label: 'Learn More' },
  { value: 'Listen now', label: 'Listen now' },
  { value: 'Order now', label: 'Order now' },
  { value: 'Play game', label: 'Play game' },
  { value: 'Request time', label: 'Request time' },
  { value: 'See menu', label: 'See menu' },
  { value: 'Shop now', label: 'Shop now' },
  { value: 'Subscribe', label: 'Subscribe' },
  { value: 'Watch more', label: 'Watch more' },
  { value: 'Apply now', label: 'Apply now' },
  { value: 'Book now', label: 'Book now' },
  { value: 'Contect us', label: 'Contact us' },
  { value: 'Download', label: 'Download' },
  { value: 'Get offer', label: 'Get offer' },
  { value: 'Get quote', label: 'Get quote' },
  { value: 'Get showtimes', label: 'Get showtimes' },
]);

export const IsPreviewShow = writable(false);

export const defaultAudienceInfos: AudienceInfos = {
    age: "24-30",
    gender: "",
    locations: [],
    interests: ["Online shopping"],
    sources: [],
  };