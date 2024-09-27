import type { AdLabel } from 'facebook-nodejs-business-sdk';

//      ENUMS       //
enum FacebookObjective {
  OUTCOME_APP_PROMOTION = 'OUTCOME_APP_PROMOTION',
  OUTCOME_AWARENESS = 'OUTCOME_AWARENESS',
  OUTCOME_ENGAGEMENT = 'OUTCOME_ENGAGEMENT',
  OUTCOME_LEADS = 'OUTCOME_LEADS',
  OUTCOME_SALES = 'OUTCOME_SALES',
  OUTCOME_TRAFFIC = 'OUTCOME_TRAFFIC',
}

type AdDetails = {
  ad_name: string;
  ad_status: string;
  ad_call_to_action_type: string;
  ad_body?: string;
  ad_title?: string;
  ad_id?: string;
  ad_image_url?: string;
  // ad_objective: string;
  // ad_currency: string;
  // ad_billing_event: string;
  // ad_start_time?: string;
  // ad_end_time?: string;
};

type AdSpend = {
  spend: string;
  /**
   * The `date_start` field represents the start date of the date range
   * for the value, typically on a per-day basis. Note that there are
   * two fields in the Facebook API that represent the date range, but
   * we only use `date_start` to avoid duplication of data.
   */
  date_start: string;
  /**
   * You can breakdown metrics according to various factors such as
   * `country` and `age`.
   */
  country?: string;
  age?: string;
};

type AdMetrics = {
  // ad_id: string;
  clicks?: string;
  cost_per_inline_link_click?: string;
  cost_per_inline_post_engagement?: string;
  cost_per_unique_click?: string;
  cpc?: string;
  cpm?: string;
  cpp?: string;
  ctr?: string;
  frequency?: string;
  impressions?: string;
  inline_link_click_ctr?: string;
  inline_link_clicks?: string;
  reach?: string;
  date_start?: string;
  date_stop?: string;
  country?: string;
  age?: string;
  cost_per_action_type?: Record<string, any>;
  actions?: Record<string, any>;
  // campaign_id?: string;
  // adset_id?: string;
};

type AdData = {
  metrics: AdMetrics[];
  spend: AdSpend[];
};

type AdTargeting = {
  demographics: Record<string, any>;
  /**
   * Optimization goal of the ad set.
   */
  optimization_goal?: string;
  /**
   * The estimated number of people you can reach with your ad. This
   * number should be accessible from the Facebook API. We should be
   * able to the model what the reach would be in the targeting
   * criteria. Probably an object.
   */
  reach?: Record<string, any>; // TODO: Figure out where this is in the API.
};

export type BusinessObject = {
  profile: string;
  /**
   * The tone and voice of the business, the words that they use to
   * communicate and their disposition */
  tone_and_voice?: string;
};

// Used during Campaign creation, not the same as Colocio Campaign
// https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#fields
export type FacebookCampaignObject = {
  id: string;
  account_id: string;
  adlabels: [AdLabel];
  name: string;
  objective: FacebookObjective;
  status: string;
  buying_type: string;
  campaign_currency: string;
  spend_cap?: string;
  lifetime_budget?: string;
  daily_budget?: string;
  issues_info?: string;
  budget_remaining?: string; // This is probably not what we want to have at this level, but is available in the API. It's the value at the time that the query is made.
  start_time?: Date;
  stop_time?: Date;
};

export type FacebookAdSetObject = {
  adset_start_time: string;
  adset_billing_event: string;
  adset_targeting?: AdTargeting;
  adset_end_time?: string;
};

export type FacebookAdObject = {
  details: AdDetails;
  insights: AdData;
};
