import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import {
  getHistoricAds,
  getPromotedObjects,
} from '$lib/services/facebook/Insights';
import type { Database } from '$types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

// NOTE: This endpoint is meant to collect all the necessary data /
// historic data that we need to calculate metrics for the user. This
// endpoint can only be executed when the following conditions are met:
// 1. The user has connected their Facebook Ad Account.
// 2. Colocio has successfully collected the necessary accounts data from
//    facebook.
// 3. The user has assigned a Facebook Ad Account to their entity.

export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.colocio.getCurrentSession();
  if (!session) {
    throw redirect(301, '/login');
  }
  const supabaseClient = locals.colocio._supaInstance;
  const user = session.user.id;

  try {
    const [tokenResult, assetsResult] = await Promise.all([
      supabaseClient
        .from('access_tokens')
        .select('access_token')
        .match({ uuid: user, provider: 'facebook' })
        .single(),
      supabaseClient
        .from('entities_assets')
        .select('auid,euid,user_assets!inner (asset_id, type)'),
    ]);

    if (tokenResult.error) throw tokenResult.error;
    if (assetsResult.error) throw assetsResult.error;

    const { data: token } = tokenResult;
    const { data: assets } = assetsResult;

    console.log('api/metrics/init', { assets, token });

    const facebookAdAccount = assets?.find(
      asset => asset.user_assets?.type === 'facebook_ad_account'
    )?.user_assets?.asset_id;

    const euid = Array.from(new Set(assets?.map(asset => asset.euid)))[0];

    const assetIds = assets?.map(asset => asset.user_assets?.asset_id);

    if (token?.access_token && facebookAdAccount) {
      const promotedObjects = await getPromotedObjects(
        token.access_token,
        facebookAdAccount
      );

      // Need to make sure that the promoted objects that are
      // filtered here are of only one entity.
      const filteredPromotedObjects = promotedObjects.filter(item =>
        assetIds?.includes(item.promoted_object)
      );

      const historicAds = await getHistoricAds(
        token.access_token,
        filteredPromotedObjects
      );
      console.log('historicAds', historicAds);

      type AdData = {
        euid: string;
        platform: 'facebook' | 'google';
        ad_id: string;
      };

      const historicAdsData: AdData[] = historicAds.map(ad => ({
        euid,
        platform: 'facebook',
        ad_id: ad,
      }));
      console.log('historicAdsData', historicAdsData);

      try {
        const { data, error } = await supabaseClient
          .from('ads')
          .upsert(historicAdsData);
        if (error) {
          throw new Error('Error while inserting data');
        }
      } catch (error) {
        throw error;
      }

      // debugger;
      return json(
        {
          success: true,
          message: 'Data inserted successfully',
        },
        { status: 200 }
      );
    }

    // debugger;

    return json({ success: true, message: 'No data found' }, { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return json({ success: false, message: error.message }, { status: 500 });
    } else {
      return json(
        {
          success: false,
          message: 'Error while selecting data',
          error: error,
        },
        { status: 500 }
      );
    }
  }

  // const { data: adAccount, error } = await locals.supabase
  //     .from('adaccounts')
  //     .select('')
  //     .eq('uuid', session.user.id)
  //     .single();

  // const allAds = await getAllAds('token', 'adAccount');

  // return new Response();
};
