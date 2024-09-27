import { DatabaseError } from '../ColocioErrors';
import type { Entity, UserProfile, AccessToken } from '$types/database';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from '$types/supabase';
// import type { Json } from '$types/database.types';

export class SupabaseStorageImplementation {
  //TODO: make local instance typed (plain imports don't work)
  private client;

  constructor(activeSupabaseClient: SupabaseClient<Database>) {
    // copy a reference to already initialized supabase instance
    this.client = activeSupabaseClient;
    console.log('<SupabaseService> Initialized');
  }

  // NOTE: Explicitly return the Facebook token at the moment. Name of this
  // function should be changed in the future to reflect that it only returns a
  // Facebook token.
  public async getAccessToken(userId: string): Promise<string> {
    try {
      const { data, error } = await this.client
        .from('access_tokens')
        .select('access_token')
        .match({ uuid: userId, provider: 'facebook' });
      return data[0].access_token;
    } catch (error) {
      return error;
    }
  }

  // uploads a raw file to Supabase bucket
  // https://supabase.com/docs/reference/javascript/storage-from-upload
  async uploadMedia(uploadingFile: File): Promise<string> {
    // get the byte data
    const buffer = await uploadingFile.arrayBuffer();

    console.log('<SupabaseService> Starting file upload to bucket...');
    const { data, error } = await this.client.storage
      .from('offerings') //TODO: change to 'media' after auth fix
      .upload(uploadingFile.name, buffer, {
        contentType: uploadingFile.type,
      });

    // inspect errors:
    if (error) {
      console.log('<SupabaseService> Upload media errored:', error);
      return Promise.reject(false);
    } else {
      console.log(data);
      /*
      TODO: Transform this response into custom type:
      {
      "path": "smiley-facebook.png",
      "id": "94439d3c-080f-4f88-9248-758eddba36b9",
      "fullPath": "offerings/smiley-facebook.png"
      }
      */
      const { fullPath } = data;
      console.log('<SupabaseService> Supabase file upload success !');
      return Promise.resolve(fullPath);
    }
  }

  // returns a list of all media URLs for public access
  async getAllMedia(): Promise<string> {
    console.log("<SupabaseService> Listing all media in 'offerings' bucket...");
    const { data, error } = await this.client.storage.from('offerings').list();

    if (error) {
      return Promise.reject();
    }

    // console.log("Offerings bucket contents:");
    // console.log(data);
    return Promise.resolve(data);
  }

  async getAllBuckets(): Promise<string[]> {
    console.log('<SupabaseService> Listing all available buckets...');
    const { data, error } = await this.client.storage.listBuckets();

    if (error != null) {
      console.log('Listing buckets errored: ', error);
      return Promise.reject();
    }

    //TODO: Add types
    return Promise.resolve(['bucket1', 'bucket2']);
  }

  /**
   * Checks if user with give ID aleady exist in DB
   * @param user UserID to check for
   * @returns `true` in case user with given ID exists in DB, `false` otherwise
   */
  async checkIfUserExists(user: User): Promise<boolean> {
    console.log('<DBService> checking for userID: ', user.id);

    // check if there's already user with this account
    const { data, error } = await this.client
      .from('user_profile')
      .select('uuid')
      .eq('uuid', user.id);

    // check for errors
    if (!error) {
      // check for data
      if (data) {
        return Promise.resolve(true);
      }
    }

    return Promise.reject(
      new DatabaseError('Unable to check for existing user')
    );
  }

  /**
   * Creates a new user profile for the given user in the database.
   *
   * @param {User} user - The `User` object for which the profile is to be
   * created.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the
   * operation was successful.
   * @throws {DatabaseError} Throws a `DatabaseError` if there are any errors
   * during the profile creation.
   */
  async createUserProfile(user: User): Promise<boolean> {
    // create new user profile in our DB
    const newUser: UserProfile = {
      uuid: user.id,
      onboarding_status: 'not_started',
      profile_name: null,
      active_entity: null,
    };

    const { error } = await this.client.from('user_profile').upsert([newUser]);

    // check for errors:
    if (error) {
      throw new DatabaseError('Unable to create user profile');
    }

    return true;
  }

  /**
   * Asynchronously fetches the UserProfile for a given user ID from the
   * Supabase database.
   *
   * @param {string} userId - The ID of the user whose profile is being fetched.
   * @returns {Promise<UserProfile>} A promise that resolves to the user's
   * profile if found.
   * @throws {DatabaseError} Throws an error if the profile fetching fails.
   */
  async getUserProfile(userId: string): Promise<UserProfile> {
    console.log('<DBService> Fetching user_profile for userID: ', userId);
    const { data, error } = await this.client
      .from('user_profile')
      .select()
      .eq('uuid', userId)
      .single<UserProfile>();

    // check for errors
    if (error) {
      console.log('<DBService> Fetching user_profile failed. Reason: ', error);
      throw new DatabaseError('Unable to get user profile');
    }

    // return given data
    return data;
  }

  /**
   * Function that returns current onboarding status
   *
   * @param userId User ID
   * @returns `ONBOARDING STATUS` enum option
   */
  async getOnboardingStatus(userID: string): Promise<string> {
    console.log('<DBService> Fetching onboarding_status for userID: ', userID);
    const { data, error } = await this.client
      .from('user_profile')
      .select('onboarding_status')
      .eq('uuid', userID)
      .single();

    // check for errors
    if (error) {
      console.log(
        '<DBService> Fetching onboarding_status failed. Reason: ',
        error
      );
      return Promise.reject(
        new DatabaseError('Unable to get onboarding status.')
      );
    }

    // return given data
    return Promise.resolve(data.onboarding_status);
  }

  /**
   * Get user entity for given user ID
   *
   * @param userId User ID
   * @returns `Entity` object associated to User
   */
  async getEntity(userId: string): Promise<Entity> {
    console.log('<DBService> Fetching entity info for userID: ', userId);
    const { data, error } = await this.client
      .from('entities')
      .select()
      .eq('euid', userId)
      .single<Entity>();

    // check for errors
    if (error) {
      console.log('<DBService> Fetching entity info failed. Reason: ', error);
      return Promise.reject(new DatabaseError('Unable to get user entity'));
    }

    // return given data
    return Promise.resolve(data);
  }

  async getCurrencies() {
    console.log('<DBService> Getting all currencies');
    const { data, error } = await this.client.from('currencies').select('*');

    if (error) {
      console.log(
        '<DBService> Failed to fecth all currencies, reason: ',
        error
      );
      throw new DatabaseError('Unable to get all currencies');
    }
    return data;
  }

  // ISSUE:This should be moved to the FacebookService file.
  async getAllFacebookPages() {
    console.log('<SupabaseService> Listing all facebook pages...');
    const { data, error } = await this.client
      .from('user_assets')
      .select('asset_id, data')
      .eq('type', 'facebook_page');

    if (error || data === null) {
      console.log('Listing facebook pages errored: ', error);
      return Promise.reject();
    }

    return Promise.resolve(data);
  }

  // ISSUE:This should be moved to the FacebookService file.
  async getFacebookPageMetricsByDate(facebookPageId: string, date: string) {
    console.log('<SupabaseService> Listing page metrics by id and date...');

    const { data, error } = await this.client
      .from('facebook_page_metrics')
      .select('*')
      .match({
        page_id: facebookPageId,
        date: date,
      });

    if (error || data === null) {
      console.log('Listing page metrics errored: ', error);
      //TODO: Reject with custom error types here
      //TODO: Add new custom Error type into file: ColocioErrors.ts
      return Promise.reject();
    }

    return Promise.resolve(data);
  }

  // ISSUE:This should be moved to the FacebookService file.
  async addFacebookPageLikes(
    facebookPageId: string,
    date: string,
    pageLikes: number
  ) {
    console.log('<SupabaseService> Inserting new page likes metric...');

    const { error } = await this.client.from('facebook_page_metrics').insert({
      page_id: facebookPageId,
      date: date,
      page_likes: pageLikes,
    });

    if (error) {
      console.log('Adding new page likes metric errored: ', error);
      return Promise.reject();
    }

    return Promise.resolve();
  }

  // ISSUE:This should be moved to the FacebookService file.
  async updateFacebookPageLikes(
    facebookPageId: string,
    date: string,
    pageLikes: number
  ) {
    console.log(
      '<SupabaseService> Updating page likes metric by id and date...'
    );

    const { error } = await this.client
      .from('facebook_page_metrics')
      .update({ page_likes: pageLikes })
      .match({
        page_id: facebookPageId,
        date: date,
      });

    if (error) {
      console.log('Updating page likes metric errored: ', error);
      return Promise.reject();
    }

    return Promise.resolve();
  }

  // ISSUE:This should be moved to the FacebookService file.
  async addFacebookPageViews(
    facebookPageId: string,
    date: string,
    pageViews: number
  ) {
    console.log('<SupabaseService> Inserting new page views metric...');

    const { error } = await this.client.from('facebook_page_metrics').insert({
      page_id: facebookPageId,
      date: date,
      page_views: pageViews,
    });

    if (error) {
      console.log('Adding new page views metric errored: ', error);
      return Promise.reject();
    }

    return Promise.resolve();
  }

  // ISSUE:This should be moved to the FacebookService file.
  async updateFacebookPageViews(
    facebookPageId: string,
    date: string,
    pageViews: number
  ) {
    console.log(
      '<SupabaseService> Updating page views metric by id and date...'
    );

    const { error } = await this.client
      .from('facebook_page_metrics')
      .update({ page_views: pageViews })
      .match({
        page_id: facebookPageId,
        date: date,
      });

    if (error) {
      console.log('Updating page views metric errored: ', error);
      return Promise.reject();
    }

    return Promise.resolve();
  }
}
