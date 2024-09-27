import { PUBLIC_FACEBOOK_CONFIG_ID } from '$env/static/public';
import type { AccessToken } from '$types/database';
import type { StatusResponse } from '$types/facebookAccounts';
import type { FacebookCampaignObject } from '$types/facebookDataTypes';
import type { Database } from '$types/supabase';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export class FacebookService {
  private accessToken: string;
  private event: ServerLoadEvent;
  private supabase: SupabaseClient<Database>;

  constructor(event: ServerLoadEvent) {
    this.event = event;
    this.accessToken = '';
    this.supabase = this.event.locals.colocio._supaInstance;
  }

  async init() {
    const currentUser = await this.event.locals.colocio.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.accessToken = await this.event.locals.colocio.storage.getAccessToken(
        currentUser.id
      );
      // WARN: This is of course a very bad idea to log the access token. Only
      // for testing purposes.
      console.log(
        '\x1b[32mFacebookService initialized with:\x1b[0m ',
        this.accessToken
      );
    } else {
      console.error('No current user found.');
    }
    return this;
  }

  getCurrentAccessToken(): string {
    return this.accessToken;
  }

  private addAccessTokenHeader(): string {
    return `Bearer ${this.accessToken}`;
  }

  public async facebookLogin(): Promise<{ success: boolean; error?: any }> {
    return new Promise((resolve, reject) => {
      FB.login(
        function (response: StatusResponse) {
          if (response.status === 'connected') {
            // exchangeToken(response.authResponse.accessToken as string)
            //   .then(({ status }) => {
            //     if (status === 200) {
            resolve({ success: true });
            //     } else {
            //       reject({
            //         success: false,
            //         error: 'Could not exchange token',
            //       });
            //     }
            //   })
            //   .catch(error => {
            //     console.error('Error exchanging token');
            //     reject(error);
            //   });
          }
        },
        {
          config_id: PUBLIC_FACEBOOK_CONFIG_ID,
        }
      );
    });
  }

  // ========================
  public async exchangeToken(shortLivedToken: string, userId: string) {
    const response = await fetch(
      `https://graph.facebook.com/${PRIVATE_FACEBOOK_API_VERSION}/oauth/access_token?` +
        `grant_type=fb_exchange_token&` +
        `client_id=${PRIVATE_FACEBOOK_APP_ID}&` +
        `client_secret=${PRIVATE_FACEBOOK_APP_SECRET}&` +
        `fb_exchange_token=${shortLivedToken}`
    );

    if (!response.ok) {
      console.error('An error occurred', response);
      // NOTE: Should not be returning json here, need to throw errors instead.
      return json('An error occurred, could not exchange token', {
        status: 500,
      });
    }
    const longLivedToken = await response.json();
    const facebookUserToken: AccessToken = {
      uuid: userId,
      provider: 'facebook',
      type: 'user',
      access_token: longLivedToken.access_token,
      expires_at: longLivedToken.expires_in,
    };
  }

  //TODO: add return type (Promise) and docs
  async createFacebookCampaign(name: string, objective: string) {
    const special_ad_categories: string[] = [];
    console.log('CreateFBCampaign; received parameters:');
    console.log(name);
    console.log(objective);

    // construct GraphAPI body data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('objective', objective); // 'OUTCOME_LEADS'
    formData.append('status', 'PAUSED'); // Hard-coded for now
    formData.append(
      'special_ad_categories',
      JSON.stringify(special_ad_categories)
    );

    //TODO: Remove after debugging
    console.log('Body data to be sent: ');
    console.log(formData);

    // perform request
    const fbEndpoint = `https://graph.facebook.com/v19.0/${adAccountId}/campaigns`;
    try {
      const response = await fetch(fbEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: this.addAccessTokenHeader(),
        },
      });

      //TODO: Synchronize this with custom types
      const data = await response.json();
      console.log('CreateAdCampaign raw response: ', data);
      return data.id;
    } catch (error) {
      // check error codes
      // https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#error-codes
      console.log('CreateAdCampaign error:', error);
      return error;
    }
  }

  async getAllCampaigns(): Promise<FacebookCampaignObject[]> {
    // add more filed parameters if needed, reference:
    // https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#example
    const neededFields =
      'name, objective, daily_budget, status, start_time, stop_time';

    // perform GraphAPI request
    console.log('service: getting all campaigns...');
    const fbURL = `https://graph.facebook.com/v19.0/${adAccountId}/campaigns?fields=${neededFields}`;
    try {
      const response = await fetch(fbURL, {
        headers: {
          Authorization: this.addAccessTokenHeader(),
        },
      });

      // examine response(s)
      const fbGraphResponse = await response.json();
      console.log('fbGraphResponse', fbGraphResponse);

      const fbCampaigns: FacebookCampaignObject[] = fbGraphResponse.data;
      return Promise.resolve(fbCampaigns);
    } catch (error) {
      console.log('GetAllCampaigns error:', error);
      return Promise.reject(error);
    }
  }

  // Uploads an image file to the Facebook
  // image has is later used to deal with Ads and Ad Creatives
  // TODO: add return type (Promise) and docs
  async uploadImage(fileToUpload: File) {
    //TODO: remove after debugging
    const fileContents = await fileToUpload.arrayBuffer();
    console.log('Decoded file: ', fileContents);

    const requestBody = new FormData();
    requestBody.append('name', fileToUpload.name);
    requestBody.append('bytes', fileContents);
    console.log('FormData: ', requestBody);

    // post an image to the endpoint, reference:
    // https://developers.facebook.com/docs/marketing-api/reference/ad-image#Creating
    const fbEndpoint = `https://graph.facebook.com/v19.0/${adAccountId}/adimages`;
    console.log('Starting FB image upload...');
    try {
      const response = await fetch(fbEndpoint, {
        method: 'POST',
        body: requestBody,
        headers: {
          Authorization: this.addAccessTokenHeader(),
        },
      });

      // examine response, reference:
      // https://developers.facebook.com/docs/marketing-api/reference/ad-image#return-type
      /*
                Map {
                    string: Map {
                    string: Struct {
                            hash: string,
                            url: string,
                            url_128: string,
                            url_256: string,
                            url_256_height: string,
                            url_256_width: string,
                            height: int32,
                            width: int32,
                            name: string,
                        }
                    }
                }
            */
    } catch (error) {
      // check error codes
      // https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#error-codes
      console.log('UploadImage error:', error);
      return error;
    }
  }

  public async getAllImages() {
    const neededFields = 'name,account_id,status,url,url_128';
    const fbEndpoint = `https://graph.facebook.com/v19.0/${adAccountId}/adimages?fileds=${neededFields}`;
    console.log('Getting all images for account...');
    try {
      const response = await fetch(fbEndpoint, {
        headers: {
          Authorization: this.addAccessTokenHeader(),
        },
      });

      // examine response, reference:
      // https://developers.facebook.com/docs/marketing-api/reference/ad-image#return-type
      const structuredResponse = await response.json();
      // console.log(structuredResponse);
      console.log(structuredResponse.data);

      //TODO: Return as promise
      return structuredResponse.data;
    } catch (error) {
      // check error codes
      // https://developers.facebook.com/docs/marketing-api/reference/ad-campaign-group#error-codes
      console.log('UploadImage error:', error);
      return error;
    }
  }

  // TODO:RTR: Check that the ad account has placed ads before. Function to only
  // run during the onboarding process.
  public async checkIfAds() {}
}
