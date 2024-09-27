import { error as err } from '@sveltejs/kit';
import {
  PRIVATE_FACEBOOK_API_VERSION,
  PRIVATE_FACEBOOK_APP_ID,
  PRIVATE_FACEBOOK_APP_SECRET,
} from '$env/static/private';
import type * as FacebookAccounts from '$types/facebookAccounts';

//TODO: Move contents of this file into file: FacebookService

/**
 * Checks the validity of a Facebook token.
 *
 * @param {string} token - The Facebook token to be checked.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean
 * indicating whether the token is valid or not.
 */
export const isValidToken = async (token: string): Promise<boolean> => {
  /**
   * Retries the fetch request multiple times if it fails, using the
   * specified number of retries. This is specifically used for this
   * Facebook Graph API endpoint that tends to fail easily.
   *
   * @param url - The URL to fetch.
   * @param options - The options to pass to the fetch request.
   * @param retries - The number of retries to attempt (default: 3).
   * @returns A Promise that resolves to the fetch response.
   * @throws If all fetch retries fail.
   */

  // NOTE: fix "wrong credentials"
  const fetchRetry = async (
    url: string,
    options: RequestInit,
    retries: number = 3
  ): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetch(url, options);
      } catch (error) {
        if (i === retries - 1) throw error;
      }
    }
    throw new Error('All fetch retries failed');
  };

  try {
    const response = await fetchRetry(
      `https://graph.facebook.com/debug_token?access_token=${PRIVATE_FACEBOOK_APP_ID}|${PRIVATE_FACEBOOK_APP_SECRET}&input_token=${token}`,
      {}
    );
    const { data } = await response.json();

    if (data && data.is_valid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking token validity:', error);
    throw err(500, 'Error checking token validity: ' + error);
  }
};

/**
 * Retrieves the ad accounts associated with a Facebook token.
 *
 * @param {string} token - The Facebook token.
 * @returns {Promise<any>} - A promise that resolves to the ad accounts
 * data.
 */
export const getAdAccounts = async (
  token: string
): Promise<FacebookAccounts.AdAccounts> => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/me/adaccounts?fields=name,account_id,age,account_status,business,currency,is_prepay_account,owner,timezone_id,user_tasks,created_time,end_advertiser,end_advertiser_name,funding_source_details&access_token=${token}`
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ad accounts:', error);
    throw err(500, 'Error fetching ad accounts: ' + error);
  }
};

/**
 * Retrieves the business accounts associated with a Facebook token.
 *
 * @param {string} token - The Facebook token.
 * @returns {Promise<FacebookAccounts.BusinessAccounts>} - A promise that
 * resolves to the business accounts data.
 * @throws {Error} - If there is an error fetching the business accounts.
 */
export const getBusinessAccounts = async (
  token: string
): Promise<FacebookAccounts.BusinessAccounts> => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/me/businesses?fields=name,primary_page,profile_picture_uri,timezone_id,vertical,verification_status,instagram_accounts{username,profile_pic},two_factor_type&access_token=${token}`
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching business accounts:', error);
    throw err(500, 'Error fetching business accounts: ' + error);
  }
};

/**
 * Asynchronously gets the Facebook pages associated with the provided
 * access token.
 *
 * @param {string} token - The access token for the Facebook Graph API.
 * @returns {Promise<FacebookAccounts.Pages>} A promise that resolves to
 * the Facebook pages.
 * @throws {Error} Throws an error if the operation fails.
 */
export const getPages = async (
  token: string
): Promise<FacebookAccounts.Pages> => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/me/accounts?access_token=${token}`
    );
    const { data } = await response.json();

    // Get extra page details. This is done separately because the
    // /me/accounts endpoint does not return the 'about' field. Only
    // retrieving the 'about' field at the moment.
    let index = 0;
    for (const page of data) {
      try {
        const res = await fetch(
          `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${page.id}?fields=about&access_token=${token}`
        );
        const { about } = await res.json();

        if (about) {
          data[index].about = about;
        }
      } catch (error) {
        console.error('Error fetching page details:', error);
      }

      try {
        const result = await fetch(
          `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${page.id}/picture?redirect=0&type=normal&access_token=${token}`
        );

        const pic = await result.json();
        if (pic) {
          data[index].profile_picture_url = pic.data.url;
        }
      } catch (error) {
        console.error('Error fetching page picture details:', error);
      }
      index++;
    }
    return data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw err(500, 'Error fetching pages: ' + error);
  }
};

/**
 * Asynchronously gets Instagram accounts associated with the provided
 * Facebook pages.
 *
 * @param {FacebookAccounts.Pages} pages - The Facebook pages to get
 * Instagram accounts for.
 * @param {string} token - The access token for the Facebook Graph API.
 * @returns {Promise<FacebookAccounts.InstagramAccounts>} A promise that
 * resolves to the Instagram accounts.
 * @throws {Error} Throws an error if the operation fails.
 */
export const getInstagramAccounts = async (
  pages: FacebookAccounts.Pages,
  token: string
): Promise<FacebookAccounts.InstagramAccounts> => {
  try {
    const instagramAccountIds = [];
    const instagramAccounts = [];

    for (const page of pages) {
      const response = await fetch(
        `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${page.id}?fields=instagram_business_account&access_token=${token}`
      );
      const data = await response.json();
      if (data.instagram_business_account) {
        instagramAccountIds.push(data.instagram_business_account.id);
      }
    }

    for (const account of instagramAccountIds) {
      const response = await fetch(
        `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${account}?fields=name,username,biography,website,profile_picture_url,followers_count,follows_count&access_token=${token}`
      );
      const data = await response.json();
      instagramAccounts.push(data);
    }
    return instagramAccounts;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw err(500, 'Error fetching pages: ' + error);
  }
};

/**
 * Asynchronously gets the Facebook Pixels associated with the provided
 * Facebook business accounts.
 *
 * @param {string | FacebookAccounts.BusinessAccounts} business_id - The
 * business ID or an array of business accounts to get Pixels for.
 * @param {string} token - The access token for the Facebook Graph API.
 * @returns {Promise<FacebookAccounts.Pixels>} A promise that resolves to
 * the Facebook Pixels.
 * @throws {Error} Throws an error if the operation fails.
 */
export const getPixels = async (
  business_id: string | FacebookAccounts.BusinessAccounts,
  token: string
): Promise<FacebookAccounts.Pixels> => {
  // TODO: Some business accounts might not have a pixel. Need to
  // account for this case and make sure that we don't spam the console
  // with errors.
  try {
    if (Array.isArray(business_id)) {
      let pixels: any[] = [];
      for (const account of business_id) {
        try {
          const res = await fetch(
            `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${account.id}/owned_pixels?fields=name,code,owner_ad_account&access_token=${token}`
          );
          const { data } = await res.json();
          pixels = pixels.concat(...data);
        } catch (error) {
          console.error('Error fetching pixel:', error);
        }
      }
      return pixels;
    } else {
      const res = await fetch(
        `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/${business_id}/owned_pixels?fields=name,code,owner_ad_account&access_token=${token}`
      );
      const { data } = await res.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching pixel:', error);
    throw err(500, 'Error fetching pixel: ' + error);
  }
};
