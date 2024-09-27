/**
 * This file provides type safety for the database.
 */
import type { Database } from './supabase';

export namespace dataBase {
  export type access_tokens = Omit<
    Database['public']['Tables']['access_tokens']['Insert'],
    'provider' | 'type'
  > & {
    provider: 'facebook' | 'google';
    type: 'user' | 'page' | 'business';
  };

  export type user_assets = Omit<
    Database['public']['Tables']['user_assets']['Insert'],
    'type'
  > & {
    type:
      | 'facebook_business_account'
      | 'facebook_ad_account'
      | 'facebook_page'
      | 'facebook_pixel'
      | 'instagram_account';
  };
}

//NOTE: Using the TypeScript form

export type UserProfile = Omit<
  Database['public']['Tables']['user_profile']['Insert'],
  'created_at'
>;
export type Entity = Database['public']['Tables']['entities']['Insert'];
export type AccessToken = Omit<
  Database['public']['Tables']['access_tokens']['Insert'],
  'provider' | 'type'
> & {
  provider: 'facebook' | 'google';
  type: 'user' | 'page' | 'business';
};
export type UserAssets = Database['public']['Tables']['user_assets']['Insert'];
export type Currency = Database['public']['Tables']['currencies']['Insert'];
