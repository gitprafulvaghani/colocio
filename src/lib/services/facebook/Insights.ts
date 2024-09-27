import { PRIVATE_FACEBOOK_API_VERSION } from '$env/static/private';
import type {
  TotalPageViewsResponse,
  FollowersCountResponse,
} from '$types/facebook-graph-api';

interface AllAdsResponse {
  ads: {
    data: {
      id: string;
    }[];
    paging: {
      cursors: {
        before: string;
        after: string;
      };
    };
  };
  id: string;
}

interface AdSets {
  data: { id: string }[];
}

interface BulkResponse {
  code: number;
  headers: string[];
  body: string;
}

interface PromotedObject {
  adset_id: string;
  promoted_object: string;
}

interface AdsObject {
  body: any;
}

/**
 * Fetches the promoted objects for a given ad account from Facebook's
 * Graph API as part of the user onboarding process.
 *
 * This function is intended to run once during user onboarding to collect
 * historical data on ads and ad sets associated with the user's entities.
 * It queries Facebook's Graph API for ad sets in the specified ad
 * account, then makes a batch request to retrieve the promoted objects
 * associated with each ad set. Promoted objects are filtered to include
 * only those with specific keys (pixel_id, page_id, application_id). The
 * result is an array of objects containing the ad set ID and the promoted
 * object. This function facilitates initial data gathering and should not
 * be used for regular data fetching.
 *
 * @param {string} token The access token for authentication with the
 * Facebook Graph API.
 * @param {string} adAccount The ID of the ad account for which promoted
 * objects are being fetched.
 * @returns {Promise<PromotedObject[]>} A promise that resolves to an
 * array of promoted objects.
 * @throws Will throw an error if the fetch operation fails or if the
 * response is not OK.
 *
 * @todo Need to handle when the user request limit is reached.
 */
export const getPromotedObjects = async (
  token: string,
  adAccount: string
): Promise<PromotedObject[]> => {
  try {
    const response: Response = await fetch(
      // Facebook Graph API Permissions: 'ads_read'
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${adAccount}/adsets?access_token=${token}`
    );

    // TODO: Here we should handle the case when the result has no ad
    // sets

    if (!response.ok) {
      const errorBody = await response.json();
      if (errorBody.error && errorBody.error.code === 17) {
        // TODO: This is a error code for "User request limit
        // reached". This needs to be handled in a way that we
        // can retry the request after a delay.
        throw new Error(`${errorBody.error.message}`);
      }
      throw new Error(
        `Failed to fetch ad sets: ${response.status}  ${errorBody}`
      );
    }

    const adSets: AdSets = await response.json();
    const adSetIds = new Set(adSets.data.map(({ id }) => id));

    // debugger;

    const batchRequest = Array.from(adSetIds).map(adSetID => ({
      method: 'GET',
      // Facebook Graph API Permissions: 'ads_read'
      relative_url: `${PRIVATE_FACEBOOK_API_VERSION}/${adSetID}?fields=promoted_object`,
    }));

    const formData = new FormData();
    formData.append('access_token', token);
    formData.append('batch', JSON.stringify(batchRequest));

    const promotedObjects: Response = await fetch(
      `https://graph.facebook.com`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const promotedObjectsData: BulkResponse[] = await promotedObjects.json();

    const promotedObjectsKeys = [
      'pixel_id',
      'page_id',
      'application_id',
    ] as const;
    const filteredPromotedObjects = new Set<PromotedObject>();

    for (const item of promotedObjectsData) {
      const body = JSON.parse(item.body);
      if (body.promoted_object) {
        for (const key of promotedObjectsKeys) {
          if (key in body.promoted_object) {
            filteredPromotedObjects.add({
              adset_id: body.id,
              promoted_object: body.promoted_object[key],
            });
          }
        }
      }
    }

    // debugger;
    return Array.from(filteredPromotedObjects);
  } catch (error) {
    console.error('Error fetching ad sets', error);
    throw error;
  }
  return [];
};

/**
 * Fetches historical ads IDs from a set of promoted objects
 * using the Facebook Graph API.
 *
 * @param {string} token The access token for authenticating API requests.
 * @param {PromotedObject[]} adSets An array of promoted objects to fetch
 * ads for.
 * @returns {Promise<string[]>} A promise that resolves to an array of
 * ads IDs.
 *
 * @todo Add TypeScript types for the response.
 * @todo Implement error handling.
 * @todo Add a retry mechanism for failed requests.
 */
export const getHistoricAds = async (
  token: string,
  adSets: PromotedObject[]
): Promise<string[]> => {
  try {
    const batchRequest = adSets.map(adSet => ({
      method: 'GET',
      // Graph API Permissions: 'ads_read'
      relative_url: `${PRIVATE_FACEBOOK_API_VERSION}/${adSet.adset_id}?fields=ads{id}`,
    }));

    const formData = new FormData();
    formData.append('access_token', token);
    formData.append('batch', JSON.stringify(batchRequest));

    const bulkAllAds: Response = await fetch(`https://graph.facebook.com`, {
      method: 'POST',
      body: formData,
    });

    try {
      const allAds: any = [];
      const allAdsData: BulkResponse[] = await bulkAllAds.json();
      for (const item of allAdsData) {
        const body: AllAdsResponse = JSON.parse(item.body);
        if (body.ads && body.ads.data) {
          body.ads.data.forEach(ad => allAds.push(ad.id));
        }
      }
      return allAds;
    } catch (error) {
      console.error('Error fetching ads', error);
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getGrowthMetrics = async (
  token: string,
  adAccount: string
): Promise<any> => {
  try {
    // PSEUDO:
    // 1. Get all ads from the ad account.
    // 2.

    // const data = await allAds.json();

    const response: Response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/me?fields=accounts&access_token=${token}`
    );
  } catch (error) {}
};

export const getTotalPageViews = async (
  facebookPageId: string,
  facebookPageToken: string
): Promise<{ value: number; end_time: string }[] | null> => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${facebookPageId}/insights?metric=page_views_total&access_token=${facebookPageToken}`
    );

    const result = (await response.json()) as TotalPageViewsResponse;

    return result.data[0].values;
  } catch (error) {
    return null;
  }
};

export const getFollowersCount = async (
  facebookPageId: string,
  facebookPageToken: string
) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${facebookPageId}?fields=followers_count&access_token=${facebookPageToken}`
    );

    const result = (await response.json()) as FollowersCountResponse;

    return result.followers_count;
  } catch (error) {
    return null;
  }
};
