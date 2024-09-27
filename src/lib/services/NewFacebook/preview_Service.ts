// TODO: Make sure that all of this functionality gets moved to the
// FacebookServices.ts file

import {
  AD_ACCOUNT_ID,
  FB_API_VERSION,
  T_TOKEN,
  creativeId,
} from '$lib/services/NewFacebook/envVariables';
const token =
  'EAATyloueTgYBOwthnh1Bp6JC7BNEwQPnZAy06hZBDKORyQEi1PhiKZBdpsSsmZAA756WKd8rZCl7Ki4wRlJsdZBDZB2BJYLyMv1NgHVCRehBa2mCtcmCBwEtjwmaWUr7BXcycRKQ2F2wAYWx1dSoJ2IaxTgz9ZBaKJE6hR9qMdJSahmgSqjGvZBSeU7BpHxA9JmdgDrtbwSzmCx2Ji9Wg';

export async function Get_All_Ad_Archive() {
  const fields = `
        ad_creation_time,
        ad_delivery_start_time,
        ad_delivery_stop_time,
        ad_snapshot_url,
        currency,
        demographic_distribution,
        impressions,
        page_id,
        page_name,
        spend
      `;
  const search_terms = 'california';
  const ad_type = 'POLITICAL_AND_ISSUE_ADS';
  const ad_reached_countries = 'US';
  const url = `https://graph.facebook.com/v18.0/ads_archive?search_terms=${search_terms}&ad_type=${ad_type}&ad_reached_countries=${ad_reached_countries}&fields=${fields}&access_token=${token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    return err.message;
  }
}

export async function get_Creative_By_Id(id: any) {
  const fields = `
      name,
      status,
      thumbnail_url,
      effective_object_story_id,
      object_story_spec,
      account_id,
      adlabels,
      asset_feed_spec,body,
      call_to_action_type,
      effective_instagram_story_id,
      image_url,link_url,title
      `;
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${creativeId}?fields=${fields}&access_token=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function get_AdSet_ById(id: any) {
  const fields = `
      name,
      status,
      effective_status,
      campaign_id,
      configured_status,
      created_time,
      updated_time,
      budget_remaining,
      campaign,
      targeting,
      insights,
      bid_amount
        `;
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${id}?fields=${fields}&access_token=${T_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err: any) {
    return err.message;
  }
}

export async function Get_Draft() {
  const fields = `
    name,
    status,
    creative,
    adset_id,
    effective_status,
    campaign_id,
    configured_status,
    created_time,
    updated_time,
    tracking_specs`;
  const status = 'DRAFT';
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/ads?status=${status}&fields=${fields}&access_token=${T_TOKEN}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (err: any) {
    return err.message;
  }
}
