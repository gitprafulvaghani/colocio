import type { Currency } from '$types/database';
import { writable, type Writable } from 'svelte/store';

// initially
export const is_user_connected = writable(false);

export const calendarFilter = writable('week');
export const bool_show_menu_mobile = writable(true);
export const platforms_ad = writable([
  {
    name: 'Facebook',
    description:
      'Shared to Feed, Stories, Reels, Search Results (Mobile and Desktop)',
    selected: true,
  },
  {
    name: 'Instagram',
    description: 'Shared to Explore Feed, Explore Home, Stories, Reels',
    selected: true,
  },
  {
    name: 'Tiktok',
    description: '',
    selected: false,
  },
  {
    name: 'X',
    description: '',
    selected: false,
  },
  {
    name: 'Youtube',
    description: '',
    selected: false,
  },
  //  {
  //    name: 'LinkedIn',
  //    description: '',
  //    selected: false,
  //  },
  //  {
  //    name: 'Google Ads',
  //    description: '',
  //    selected: false,
  //  },
]);

export const bool_modal_media = writable(false);
export const bool_modal_metrics = writable(false);
export const bool_modal_Ad_Edit = writable(false);
export const isEditModelOpen = writable(false);
export const schedule_Eidit_Model = writable(false);
export const audience_edit_model = writable(false);
export const text_edit_model = writable(false);
export const Goal_Edit_Modal = writable(false);
export const Open_text_Model = writable(false);

export const library = writable([
  {
    src: 'girlfriends.png',
    selected: false,
  },
  {
    src: 'sunflowers.png',
    selected: false,
  },
  {
    src: 'poolparty1.png',
    selected: false,
  },
  {
    src: 'girlfriends2.png',
    selected: false,
  },
  {
    src: 'poolparty2.png',
    selected: false,
  },
  {
    src: 'camping.png',
    selected: false,
  },
  {
    src: 'pizzaparty.png',
    selected: false,
  },
  {
    src: 'winefarm.png',
    selected: false,
  },
  {
    src: 'balloons.png',
    selected: false,
  },
  {
    src: 'city.png',
    selected: false,
  },
]);

export const insights_selected = writable('trends');
export const trends_selected = writable('ad_insights');
export const company_infos = writable({ name: null });
export const elevator_pitch = writable('');
export const detailed_offering = writable('');
export const currency = writable({});
export const currencies = writable<Currency[]>([]);
export const add_object_business = writable({
  show: false,
  type: 'product',
  mode: 'add',
  object: {},
});

export const objects_added_business: Writable<{
  products: {}[];
  services: {}[];
}> = writable({ products: [], services: [] });
export const bool_success_onboarding = writable(false);
export const toastStore = writable<any[]>([]);
export const platformDetailsStore = writable(['Facebook']);
export const GoalsStore = writable({});
export const AudienceStore = writable({});
export const textStore = writable({});
export const mediaStore = writable({});
export const Selected_Library_Store = writable<any[]>([]);
export const ScheduleStore = writable<any[]>([]);
export const StoreSharePost = writable<any[]>([]);
export const ViewSummerStore = writable({});
export const automatedAudience = writable({});
export const automatedSchedule = writable({});
export const automateded_Text_Details = writable({
  description: 'Don’t miss our Champaign Pool Party kits this summer.',
  headline_1: 'Champaign Pool Party kits available now!',
  headline_2: 'Party kits available online!',
  Selected_Library: [],
  action_button_text: 'Shop now',
  bool_show_button: true,
  bool_colocio_description: false,
  colocio_description: '',
  colocio_prompt: '',
  url_action: 'https://www.theamazingcompany.com/products',
});
export const Store_Selected_goal = writable('leads');
export const automated_Goals_Store = writable([
  'Special Discount',
  'Limited-Time Offer',
  '50% Off Today',
]);

export const autoSetTextDetails = writable({
  Selected_Library: [],
  action_button_text: '',
  bool_show_button: false,
  description: '',
  url_action: '',
});
export const InstaTextDetails = writable({
  Selected_Library: [],
  action_button_text: '',
  bool_show_button: false,
  description: '',
  url_action: '',
});
export const mainSetTextDetails = writable({
  Selected_Library: [],
  action_button_text: '',
  bool_show_button: false,
  description: '',
  url_action: '',
});
export const mainInstaTextDetails = writable({
  Selected_Library: [],
  action_button_text: '',
  bool_show_button: false,
  description: '',
  url_action: '',
});
