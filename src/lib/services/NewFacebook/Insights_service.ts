import {
  AD_ACCOUNT_ID,
  FB_API_VERSION,
  FB_token,
  PAGE_ID_1,
  Access_token_1,
  AD_ACCOUNT_ID_1,
  AD_CAMPAIGN_ID_1,
  POST_ID,
  P_PAGE_TOKEN,
  PAGE_ID,
  PAGE_ID_FOR_VISIT,
  TOKEN_FOR_VISIT,
  T_TOKEN,
  AD_CAMPAIGN_ID_2,
} from '$lib/services/NewFacebook/envVariables';
import type { Writable } from 'svelte/store';
import type {
  CommentsSummary,
  LikesSummary,
  ReactionsSummary,
  ReelViewsSummary,
  SharesSummary,
} from '../interface/matric';

let new_page_ID = '182978528231776';
let new_page_token =
  'EAATyloueTgYBO7nhzPZCmyCcZAqCpXFS5jfZA7zPZA4oZAH4vXPPactoAJfLbFfOZBckTZBZAf73rZA8AByWw8UH2ExnpR8of1XvVEAAEJiFgZBWcay0EIPbKEDPh2eDIm5QRj9xsjUMs7ZCS8HxoCoZB4KE1E2TL8MyOFTIMNsGVflzwCH7BRF7iOP2MPPZANdPsQ94SItfYntMccbZCCnSkZD';

export async function fetchInsights(ADSET_ID: any) {
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${ADSET_ID}/insights?  access_token=${FB_token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error: any) {
    return error.message;
  }
}

//---------------- performers api ----------------
export async function fetch_Tab_Performing(value: any) {
  let url = '';
  if (value === 'post') {
    const fields = `message,
             created_time,
             likes.summary(true),
             comments.summary(true),
             shares.summary(true),
             reactions.summary(true),
             updated_time,
             status_type,
             picture,
             full_picture,
             story,
             id`;
    url = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_1}/posts?fields=${fields}&access_token=${Access_token_1}`;
  } else {
    const fields = `name,
          message,
          adcreatives{
              effective_object_story_id,
              body,
              title,
              image_url,
              thumbnail_url
          },
          status,
          insights{
              impressions,
              clicks,
              spend
          },
          updated_time,
          created_time`;
    url = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID_1}/ads?fields=${fields}&access_token=${Access_token_1}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
  }
}

export const GetInterestandBehaviour = async (): Promise<any> => {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID_1}/targetingsearch`;
  const params = new URLSearchParams({
    q: 'travel',
    type: 'adinterest',
    access_token: Access_token_1,
  });

  const url = `${apiUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching targeting options:', error);
    throw error;
  }
};

export const getAdsetInsightsData = async (): Promise<any> => {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/insights`;
  const params = new URLSearchParams({
    fields:
      'spend,campaign_id,adset_id,ad_id,clicks,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cpc,cpm,cpp,ctr,frequency,impressions,inline_link_click_ctr,inline_link_clicks,reach,cost_per_action_type,action_values,unique_actions,video_30_sec_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,website_ctr',
    breakdowns: 'age,gender',
    time_range: '{"since":"2024-01-01","until":"2024-06-01"}',
    action_breakdowns: 'action_type',
    level: 'adset',
    access_token: Access_token_1,
  });

  const url = `${apiUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error response from API:', errorResponse);
      throw new Error(
        `HTTP error! status: ${response.status} - ${errorResponse.error.message}`
      );
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching adset insights:', error);
    throw error;
  }
};

export async function getPostReachvsSpendInsightsData(
$trends_selected_post: string, timeframe: string, trends_selected_post: Writable<string>) {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_CAMPAIGN_ID_2}/insights`;
  const params = new URLSearchParams({
    fields: 'reach,spend,impressions',
    breakdowns: 'gender,age',
    access_token: T_TOKEN,
  });

  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
    console.log('check data +++++++++++++++++++', data);
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GrowthRateInsightsData() {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID_1}/insights`;
  const params = new URLSearchParams({
    access_token: Access_token_1,
  });

  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Groth daata check data +++++++++++++++++++', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export const getAdsetInsights = async (timePeriod: string): Promise<any> => {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/insights`;

  let timeRange: { since: string; until: string };
  const currentDate = new Date();

  switch (timePeriod) {
    case '7days':
      timeRange = {
        since: new Date(currentDate.setDate(currentDate.getDate() - 7))
          .toISOString()
          .split('T')[0],
        until: new Date().toISOString().split('T')[0],
      };
      break;
    case '30days':
      timeRange = {
        since: new Date(currentDate.setDate(currentDate.getDate() - 30))
          .toISOString()
          .split('T')[0],
        until: new Date().toISOString().split('T')[0],
      };
      break;
    case '6months':
      timeRange = {
        since: new Date(currentDate.setMonth(currentDate.getMonth() - 6))
          .toISOString()
          .split('T')[0],
        until: new Date().toISOString().split('T')[0],
      };
      break;
    case '1year':
      timeRange = {
        since: new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
          .toISOString()
          .split('T')[0],
        until: new Date().toISOString().split('T')[0],
      };
      break;
    default:
      throw new Error('Invalid time period');
  }

  const params = new URLSearchParams({
    fields:
      'spend,campaign_id,actions,adset_id,ad_id,clicks,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cpc,cpm,cpp,ctr,frequency,impressions,inline_link_click_ctr,inline_link_clicks,reach,cost_per_action_type,action_values,unique_actions,video_30_sec_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,website_ctr',
    breakdowns: 'age,gender',
    time_range: JSON.stringify(timeRange),
    action_breakdowns: 'action_type',
    level: 'adset',
    access_token: Access_token_1,
  });

  const url = `${apiUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error response from API:', errorResponse);
      throw new Error(
        `HTTP error! status: ${response.status} - ${errorResponse.error.message}`
      );
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching adset insights:', error);
    throw error;
  }
};

export const getAdsetInsightsPrevious = async (
  timePeriod: string
): Promise<any> => {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/insights`;

  const previousDate = getTimeRange1(timePeriod).previous;

  const params = new URLSearchParams({
    fields:
      'spend,campaign_id,actions,adset_id,ad_id,clicks,cost_per_inline_link_click,cost_per_inline_post_engagement,cost_per_unique_click,cpc,cpm,cpp,ctr,frequency,impressions,inline_link_click_ctr,inline_link_clicks,reach,cost_per_action_type,action_values,unique_actions,video_30_sec_watched_actions,video_p100_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,website_ctr',
    breakdowns: 'age,gender',
    time_range: JSON.stringify(previousDate),
    action_breakdowns: 'action_type',
    level: 'adset',
    access_token: Access_token_1,
  });

  const url = `${apiUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Error response from API:', errorResponse);
      throw new Error(
        `HTTP error! status: ${response.status} - ${errorResponse.error.message}`
      );
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching adset insights:', error);
    throw error;
  }
};

export async function getInsights(type: String) {
  const ADUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_CAMPAIGN_ID_2}/insights`;
  const paramsAD = new URLSearchParams({
    breakdowns: 'age,gender',
    fields: 'reach,spend',
    access_token: Access_token_1,
    time_increment: '1',
  });

  const PostUrl = `https://graph.facebook.com/${FB_API_VERSION}/${POST_ID}/insights?`;
  const paramsPOST = new URLSearchParams({
    breakdowns: 'age,gender',
    metric: 'post_impressions',
    fields: 'reach,spend',
    access_token: Access_token_1,
    time_increment: '1',
  });

  let URL;
  if (type == 'ad_insights') {
    URL = `${ADUrl}?${paramsAD}`;
  } else {
    URL = `${PostUrl}/${paramsPOST}`;
  }

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('API Response Data+++++++:', data); 
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function getPlatfrom() {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_CAMPAIGN_ID_2}/insights`;
  const params = new URLSearchParams({
    breakdowns: 'publisher_platform,platform_position,impressio n_device',
    fields: 'impressions,clicks,reach,spend',
    access_token: Access_token_1,
    time_increment: '1',
  });

  const url = `${apiUrl}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GetLocationInsights() {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_CAMPAIGN_ID_2}/insights`;
  const params = new URLSearchParams({
    breakdowns: 'country,region',
    fields: 'reach,spend',
    access_token: Access_token_1,
    time_increment: '1',
  });

  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
console.log('chuhcuuchcuhcuhcuhcuhhuhcuhcuchuchuchuhcuchchccyh',data);

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

//===================================================================

function getTimeRange(timePeriod: string): { since: string; until: string } {
  const currentDate = new Date();
  let sinceDate: Date;

  switch (timePeriod) {
    case '7days':
      sinceDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
      break;
    case '30days':
      sinceDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
      break;
    case '6months':
      sinceDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
      break;
    case '1year':
      sinceDate = new Date(
        currentDate.setFullYear(currentDate.getFullYear() - 1)
      );
      break;
    default:
      throw new Error('Invalid time period');
  }

  return {
    since: sinceDate.toISOString().split('T')[0],
    until: new Date().toISOString().split('T')[0],
  };
}

function getTimeRange1(timePeriod: string): {
  current: { since: string; until: string };
  previous: { since: string; until: string };
} {
  const currentDate = new Date();
  let sinceDate: Date;
  let previousSinceDate: Date;
  let previousUntilDate: Date;

  switch (timePeriod) {
    case '7days':
      sinceDate = new Date(currentDate);
      sinceDate.setDate(currentDate.getDate() - 7);
      previousUntilDate = new Date(sinceDate);
      previousSinceDate = new Date(previousUntilDate);
      previousSinceDate.setDate(previousUntilDate.getDate() - 7);
      break;
    case '30days':
      sinceDate = new Date(currentDate);
      sinceDate.setDate(currentDate.getDate() - 30);
      previousUntilDate = new Date(sinceDate);
      previousSinceDate = new Date(previousUntilDate);
      previousSinceDate.setDate(previousUntilDate.getDate() - 30);
      break;
    case '6months':
      sinceDate = new Date(currentDate);
      sinceDate.setMonth(currentDate.getMonth() - 6);
      previousUntilDate = new Date(sinceDate);
      previousSinceDate = new Date(previousUntilDate);
      previousSinceDate.setMonth(previousUntilDate.getMonth() - 6);
      break;
    case '1year':
      sinceDate = new Date(currentDate);
      sinceDate.setFullYear(currentDate.getFullYear() - 1);
      previousUntilDate = new Date(sinceDate);
      previousSinceDate = new Date(previousUntilDate);
      previousSinceDate.setFullYear(previousUntilDate.getFullYear() - 1);
      break;
    default:
      throw new Error('Invalid time period');
  }

  return {
    current: {
      since: sinceDate.toISOString().split('T')[0],
      until: new Date().toISOString().split('T')[0],
    },
    previous: {
      since: previousSinceDate.toISOString().split('T')[0],
      until: previousUntilDate.toISOString().split('T')[0],
    },
  };
}
//===================================================================

export async function GetNewFollows(timePeriod: string): Promise<any> {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${new_page_ID}/insights`;

  const timeRange = getTimeRange(timePeriod);

  const params = new URLSearchParams({
    metric: 'page_fan_adds',
    time_range: JSON.stringify(timeRange),
    access_token: new_page_token,
    time_increment: '1',
  });

  const url = `${apiUrl}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      //  throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GrowthPageandProfile(timePeriod: string): Promise<any> {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${new_page_ID}/insights`;

  const timeRange = getTimeRange(timePeriod);

  const params = new URLSearchParams({
    metric: 'page_views_total,page_impressions',
    access_token: new_page_token,
    time_range: JSON.stringify(timeRange),
  });

  const url = `${apiUrl}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      //  throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function page_fan_adds(timePeriod: string): Promise<any> {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${new_page_ID}/insights/page_fan_adds`;

  const timeRange = getTimeRange(timePeriod);

  const params = new URLSearchParams({
    access_token: new_page_token,
    time_increment: '1',
    time_range: JSON.stringify(timeRange),
  });

  const url = `${apiUrl}?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      //  throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GetAgeandGender() {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID_1}/insights`;
  const params = new URLSearchParams({
    breakdowns: 'age,gender',
    fields: 'reach,impressions,frequency,spend,actions,action_values',
    access_token: Access_token_1,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GetRegionandcountry() {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID_1}/insights`;
  const params = new URLSearchParams({
    breakdowns: 'region,country ',
    fields: 'reach,impressions,frequency,spend,actions,action_values',
    access_token: Access_token_1,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GetInterestandBehaviourAudiences() {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/search`;
  const params = new URLSearchParams({
    type: 'adinterest',
    q: 'Movies',
    access_token: Access_token_1,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

// Campaign Engagements API
const fetchFacebookData = async (
  fbAccessToken: string,
  fbPageId: string,
  timePeriod: string
): Promise<{
  likesSummary: LikesSummary;
  commentsSummary: CommentsSummary;
  sharesSummary: SharesSummary;
  reelViewsSummary: ReelViewsSummary;
  reactionsSummary: ReactionsSummary;
  Post_response: any;
}> => {
  let likesSummary: LikesSummary = { facebook: 0, instagram: 0 };
  let commentsSummary: CommentsSummary = { facebook: 0, instagram: 0 };
  let sharesSummary: SharesSummary = { facebook: 0, instagram: 0 };
  let reelViewsSummary: ReelViewsSummary = { facebook: 0, instagram: 0 };
  let reactionsSummary: ReactionsSummary = {
    like: 0,
    love: 0,
    care: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };
  let Post_response: any;
  const timeRang = getTimeRange(timePeriod);
  const newTimeRange = getTimeRange1(timePeriod);

  let url = `https://graph.facebook.com/v12.0/${fbPageId}/posts?fields=likes.summary(true),reactions.summary(true),comments.summary(true),shares,attachments{media_type}&time_range=${timeRang},&access_token=${fbAccessToken}`;
  try {
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      
      
      const posts = data.data;
      Post_response = posts;
      posts.forEach((post: any) => {
        likesSummary.facebook += post.likes.summary.total_count;
        commentsSummary.facebook += post.comments.summary.total_count;
        sharesSummary.facebook += post.shares ? post.shares.count : 0;

        if (post.attachments && post.attachments.data.length > 0) {
          const mediaType = post.attachments.data[0].media_type;
          if (mediaType === 'video') {
            reelViewsSummary.instagram +=
              post.attachments.data[0].video_insights?.video_view_count || 0;
          }
        }
        const reactions = post.reactions.data;
        reactions.forEach((post: any) => {
          if (post.type === 'LIKE') {
            reactionsSummary.like += 1;
          }
          if (post.type === 'LOVE') {
            reactionsSummary.love += 1;
          }
          if (post.type === 'CARE') {
            reactionsSummary.care += 1;
          }
          if (post.type === 'HAHA') {
            reactionsSummary.haha += 1;
          }
          if (post.type === 'WOW') {
            reactionsSummary.wow += 1;
          }
          if (post.type === 'SAD') {
            reactionsSummary.sad += 1;
          }
          if (post.type === 'ANGRY') {
            reactionsSummary.angry += 1;
          }
        });
      });

      url = data.paging ? data.paging.next : null;
    }
  } catch (error) {
    console.error('Error fetching Facebook data:', error);
  }

  return {
    likesSummary,
    commentsSummary,
    sharesSummary,
    reelViewsSummary,
    reactionsSummary,
    Post_response,
  };
};
const fetch_Priview_FacebookData = async (
  fbAccessToken: string,
  fbPageId: string,
  timePeriod: string
): Promise<{
  likesSummary: LikesSummary;
  commentsSummary: CommentsSummary;
  sharesSummary: SharesSummary;
  reelViewsSummary: ReelViewsSummary;
  reactionsSummary: ReactionsSummary;
  Post_response: any;
}> => {
  let likesSummary: LikesSummary = { facebook: 0, instagram: 0 };
  let commentsSummary: CommentsSummary = { facebook: 0, instagram: 0 };
  let sharesSummary: SharesSummary = { facebook: 0, instagram: 0 };
  let reelViewsSummary: ReelViewsSummary = { facebook: 0, instagram: 0 };
  let reactionsSummary: ReactionsSummary = {
    like: 0,
    love: 0,
    care: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };
  let Post_response: any;
  const timeRang = getTimeRange(timePeriod);
  const newTimeRange = getTimeRange1(timePeriod);

  let url = `https://graph.facebook.com/v12.0/${fbPageId}/posts?fields=likes.summary(true),reactions.summary(true),comments.summary(true),shares,attachments{media_type}&time_range=${newTimeRange.previous},&access_token=${fbAccessToken}`;
  try {
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      const posts = data.data;
      Post_response = posts;
      posts.forEach((post: any) => {
        likesSummary.facebook += post.likes.summary.total_count;
        commentsSummary.facebook += post.comments.summary.total_count;
        sharesSummary.facebook += post.shares ? post.shares.count : 0;

        if (post.attachments && post.attachments.data.length > 0) {
          const mediaType = post.attachments.data[0].media_type;
          if (mediaType === 'video') {
            reelViewsSummary.instagram +=
              post.attachments.data[0].video_insights?.video_view_count || 0;
          }
        }
        const reactions = post.reactions.data;
        reactions.forEach((post: any) => {
          if (post.type === 'LIKE') {
            reactionsSummary.like += 1;
          }
          if (post.type === 'LOVE') {
            reactionsSummary.love += 1;
          }
          if (post.type === 'CARE') {
            reactionsSummary.care += 1;
          }
          if (post.type === 'HAHA') {
            reactionsSummary.haha += 1;
          }
          if (post.type === 'WOW') {
            reactionsSummary.wow += 1;
          }
          if (post.type === 'SAD') {
            reactionsSummary.sad += 1;
          }
          if (post.type === 'ANGRY') {
            reactionsSummary.angry += 1;
          }
        });
      });

      url = data.paging ? data.paging.next : null;
    }
  } catch (error) {
    console.error('Error fetching Facebook data:', error);
  }

  return {
    likesSummary,
    commentsSummary,
    sharesSummary,
    reelViewsSummary,
    reactionsSummary,
    Post_response,
  };
};
const fetchInstagramData = async (
  igAccessToken: string,
  igPageId: string
): Promise<{
  likesSummary: LikesSummary;
  commentsSummary: CommentsSummary;
  sharesSummary: SharesSummary;
  reelViewsSummary: ReelViewsSummary;
}> => {
  let likesSummary: LikesSummary = { facebook: 0, instagram: 0 };
  let commentsSummary: CommentsSummary = { facebook: 0, instagram: 0 };
  let sharesSummary: SharesSummary = { facebook: 0, instagram: 0 };
  let reelViewsSummary: ReelViewsSummary = {
    instagram: 0,
    facebook: 0,
  };

  let url = `https://graph.instagram.com/v12.0/${igPageId}/media?fields=like_count,comments_count,permalink,media_type,children{media_url,media_type,thumbnail_url,permalink,shortcode},caption,timestamp&access_token=${igAccessToken}`;
  try {
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      const posts = data.data;

      posts.forEach((post: any) => {
        likesSummary.instagram += post.like_count;
        commentsSummary.instagram += post.comments_count;
        sharesSummary.instagram += post.shares ? post.shares.count : 0;

        if (post.media_type === 'VIDEO') {
          reelViewsSummary.instagram += post.video_view_count;
        }
      });

      url = data.paging ? data.paging.next : null;
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
  }

  return { likesSummary, commentsSummary, sharesSummary, reelViewsSummary };
};

export { fetchFacebookData, fetchInstagramData, fetch_Priview_FacebookData };

export async function GetPageProfilevisits(timePeriod: any) {
  const timeRang: any = getTimeRange(timePeriod);
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_FOR_VISIT}/insights/page_views_total`;
  const params = new URLSearchParams({
    time_range: JSON.stringify(timeRang),
    access_token: TOKEN_FOR_VISIT,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GetNewfollowers($timePeriod: string) {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_FOR_VISIT}/insights/page_fan_adds`;
  const params = new URLSearchParams({
    time_range: '{"since":"2023-06-28","until":"2024-06-28"}',
    access_token: TOKEN_FOR_VISIT,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

//export async function GetPageunlikesandunfollows($timePeriod: string) {
//  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_FOR_VISIT}/insights/page_fan_removes`;
//  const params = new URLSearchParams({
//    time_range: '{"since":"2023-06-28","until":"2024-06-28"}',
//    access_token: TOKEN_FOR_VISIT,
//    time_increment: '1',
//  });
//  const url = `${apiUrl}?${params}`;
//  try {
//    const response = await fetch(url);
//    if (!response.ok) {
//      throw new Error(`HTTP error! Status: ${response.status}`);
//    }
//    const data = await response.json();
//
//    return data.data;
//  } catch (error) {
//    console.error('Error fetching Facebook API:', error);
//    throw error;
//  }
//}

export async function GetPageunlikesandunfollows(timePeriod: any) {
  const timeRang: any = getTimeRange(timePeriod);

  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_FOR_VISIT}/insights/page_fan_removes`;
  const params = new URLSearchParams({
    time_range: JSON.stringify(timeRang),
    access_token: TOKEN_FOR_VISIT,
    time_increment: '1',
  });

  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function GetPageProfilevisit($timePeriod: string) {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_FOR_VISIT}/insights/page_views_total`;
  const params = new URLSearchParams({
    time_range: '{"since":"2023-06-28","until":"2024-06-28"}',
    access_token: TOKEN_FOR_VISIT,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function getHourlyBreakDown(week: boolean) {
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_CAMPAIGN_ID_1}/insights`;
  const params = new URLSearchParams({
    fields: 'impressions',
    access_token: Access_token_1,
    breakdowns: 'hourly_stats_aggregated_by_audience_time_zone',
  });

  if (week) {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);

    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const timeRange = {
      since: startOfWeek.toISOString().split('T')[0],
      until: endOfWeek.toISOString().split('T')[0],
    };

    params.append('time_range', JSON.stringify(timeRange));
  }

  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function getTargetingAudienceForAd(adsetId: String) {
  const URL = `https://graph.facebook.com/${FB_API_VERSION}/${adsetId}?fields=targeting&access_token=${T_TOKEN}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.targeting;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function getPageFanOnline() {
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID_1}/insights/page_fans_online?access_token=${Access_token_1}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function Optimalaudience() {
  const timeRang: any = getTimeRange('30days');
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID_1}/adsets`;
  const params = new URLSearchParams({
    time_range: JSON.stringify(timeRang),
    fields:
      'id,name,status,campaign_id,daily_budget,lifetime_budget,start_time,end_time,targeting,optimization_goal,billing_event,bid_amount,created_time,updated_time',
    access_token: T_TOKEN,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}

export async function AdInsights_TopPerfoming() {
  // const timeRang: any = getTimeRange();
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/ads`;
  const params = new URLSearchParams({
    // time_range: JSON.stringify(timeRang),
    fields:
      'name,creative{effective_object_story_id,object_story_spec},insights{reach,impressions},adset{name,daily_budget,start_time,end_time,targeting}',
    access_token: T_TOKEN,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}



export async function GetAudianceTab() {
  // const timeRang: any = getTimeRange();
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${AD_ACCOUNT_ID}/ads`;
  const params = new URLSearchParams({
    // time_range: JSON.stringify(timeRang),
    fields:
      'message,adcreatives{body,title,image_url,thumbnail_url,image_hash},status,insights{impressions,reach,clicks},updated_time,created_time',
    access_token: T_TOKEN,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}



export async function GetAudianceTab2() {
  // const timeRang: any = getTimeRange();
  const apiUrl = `https://graph.facebook.com/${FB_API_VERSION}/${PAGE_ID}/posts`;
  const params = new URLSearchParams({
    // time_range: JSON.stringify(timeRang),
    fields:
      'fields=id,created_time,full_picture,message,likes.limit(0).summary(total_count),comments.limit(0).summary(total_count),status_type,insights.metric(post_engaged_users,post_impressions)',
    access_token: P_PAGE_TOKEN,
    time_increment: '1',
  });
  const url = `${apiUrl}?${params}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook API:', error);
    throw error;
  }
}


