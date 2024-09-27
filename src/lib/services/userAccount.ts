import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Asynchronously gets the user ID from the current session.
 *
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @returns {Promise<string>} The user ID if a session is found.
 * @throws {Error} Throws an error if no session is found.
 */
export const getUserId = async (supabase: SupabaseClient) => {
  try {
    const {
      data: { session },
      error: err,
    } = await supabase.auth.getSession();

    if (session) {
      return session.user.id;
    } else {
      throw new Error('No session found');
    }
  } catch (error) {}
};

/**
 * Retrieves the active entity for a given user.
 *
 * @param {string} user - The UUID of the user.
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @returns {Promise<string|null>} - The active entity or null if not
 * found.
 * @throws {Error} - If there is an error retrieving the active entity.
 */
export const getActiveEntity = async (
  user: string,
  supabase: SupabaseClient
) => {
  try {
    const { data: entity, error: err } = await supabase
      .from('user_profile')
      .select('active_entity')
      .eq('uuid', user)
      .single();
    if (entity) {
      return entity.active_entity;
    }
    return null;
  } catch (error) {
    console.error('Error getting active entity:', error);
    throw error;
  }
};

/**
 * Asynchronously sets the active entity for a user.
 *
 * @param {string} user - The user's UUID.
 * @param {string} entity - The entity to set as active.
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @returns {Promise<void>} A promise that resolves when the operation is
 * complete.
 * @throws {Error} Throws an error if the operation fails.
 */
export const setActiveEntity = async (
  user: string,
  entity: string,
  supabase: SupabaseClient
) => {
  try {
    const { error } = await supabase
      .from('user_profile')
      .update({ active_entity: entity })
      .eq('uuid', user);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error setting active entity:', error);
    throw error;
  }
};

/**
 * Retrieves the user access token for a specific provider.
 *
 * @param {string} user - The UUID of the user.
 * @param {'facebook' | 'google'} provider - The provider name.
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @returns {Promise<string|null>} - The user access token or null if not
 * found.
 */
export const getUserAccessToken = async (
  user: string,
  provider: 'facebook' | 'google',
  supabase: SupabaseClient
) => {
  try {
    const { data, error: err } = await supabase
      .from('access_tokens')
      .select('access_token')
      .eq('uuid', user)
      .eq('provider', provider)
      .eq('type', 'user')
      .single();
    if (data) {
      return data.access_token;
    }
    return null;
  } catch (error) {}
};

/**
 * Retrieves the profile picture of a asset
 *
 * @param {string} user - The user id of the asset's user.
 * @param {string} asset_id - The asset id of the asset.
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @returns {Promise<string|null>} - The profile picture url or null if not
 * found.
 */
export const getProfilePicture = async (
  user: string,
  asset_id: string,
  supabase: SupabaseClient
) => {
  try {
    const { data, error: err } = await supabase
      .from('user_assets')
      .select('data->profile_picture_url')
      .eq('asset_id', asset_id)
      .eq('uuid', user)
      .single();
    if (data) {
      return data.profile_picture_url;
    }
    return null;
  } catch (error) {}
};
