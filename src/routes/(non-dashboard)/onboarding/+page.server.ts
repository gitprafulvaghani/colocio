import * as facebookAccounts from '$lib/services/facebook/Accounts';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import * as userAccount from '$lib/services/userAccount';
// import OpenAI from 'openai';
// import { PRIVATE_OPENAI_KEY } from '$env/static/private';
// import { goto } from '$app/navigation';

// export const actions = {
//   loadFacebook: async ({ locals }) => {
//     console.log('loadFacebook Form action (+page.server.ts)');
//
//     const session = await locals.colocio.getCurrentSession();
//     const user = session?.user.id;
//
//     let res;
//
//     if (session && user) {
//       const fb_access_token = await userAccount.getUserAccessToken(
//         user,
//         'facebook',
//         locals.supabase
//       );
//
//       if (await facebookAccounts.isValidToken(fb_access_token)) {
//         const [adAccounts, businessAccounts, pages] = await Promise.all([
//           facebookAccounts.getAdAccounts(fb_access_token),
//           facebookAccounts.getBusinessAccounts(fb_access_token),
//           facebookAccounts.getPages(fb_access_token),
//         ]);
//         // Instagram accounts are fetched from the pages endpoint.
//         // So we call the getInstagramAccounts function after the
//         // getPages function.
//         const instagramAccounts = await facebookAccounts.getInstagramAccounts(
//           pages,
//           fb_access_token
//         );
//         // Pixels need to be fetched from the ad accounts
//         // endpoint. So we call the getPixels function after the
//         // getAdAccounts function.
//         const pixels = await facebookAccounts.getPixels(
//           businessAccounts,
//           fb_access_token
//         );
//
//         const dbInsertAdAccounts: DB.user_assets[] = adAccounts.map(
//           account => ({
//             uuid: user,
//             asset_id: account.id,
//             type: 'facebook_ad_account',
//             data: {
//               name: account.name,
//               account_status: account.account_status,
//               currency: account.currency,
//               timezone_id: account.timezone_id,
//               owner: account.owner,
//               business: account.business,
//               is_prepay_account: account.is_prepay_account,
//               user_tasks: account.user_tasks,
//               created_time: account.created_time,
//               funding_source_details: account.funding_source_details,
//               end_advertiser_name: account.end_advertiser_name,
//               end_advertiser: account.end_advertiser,
//             },
//           })
//         );
//
//         const dbInsertPages: DB.user_assets[] = pages.map(page => ({
//           uuid: user,
//           asset_id: page.id,
//           type: 'facebook_page',
//           data: {
//             // TODO: Here the access token is a page token
//             // (does not expire). Debate if we should
//             // store the page token in the access_tokens
//             // table or if we should keep it in this table
//             // (user_assets.data->access_token).
//             name: page.name,
//             access_token: page.access_token,
//             category: page.category,
//             tasks: page.tasks,
//             about: page.about,
//           },
//         }));
//
//         const dbInsertBusinessAccounts: DB.user_assets[] = businessAccounts.map(
//           account => ({
//             uuid: user,
//             asset_id: account.id,
//             type: 'facebook_business_account',
//             data: {
//               profile_picture_url: account.profile_picture_uri,
//               verification_status: account.verification_status,
//               vertical: account.vertical,
//               two_factor_type: account.two_factor_type,
//               primary_page_id: account.primary_page?.id,
//             },
//             // TODO: Update the entities table with the
//             // timezone_id.
//           })
//         );
//
//         const dbInsertInstagramAccounts: DB.user_assets[] =
//           instagramAccounts.map(account => ({
//             uuid: user,
//             asset_id: account.id,
//             type: 'instagram_account',
//             data: {
//               username: account.username,
//               name: account.name,
//               biography: account.biography,
//               profile_picture_url: account.profile_picture_url,
//               followers_count: account.followers_count,
//               follows_count: account.follows_count,
//             },
//           }));
//
//         const dbInsertPixels: DB.user_assets[] = pixels.map(pixel => ({
//           uuid: user,
//           asset_id: pixel.id,
//           type: 'facebook_pixel',
//           data: {
//             name: pixel.name,
//             code: pixel.code,
//             owner_ad_account_id: pixel.owner_ad_account.account_id,
//           },
//         }));
//
//         const { data: insertedData, error } = await locals.supabase
//           .from('user_assets')
//           .upsert([
//             ...dbInsertAdAccounts,
//             ...dbInsertPages,
//             ...dbInsertBusinessAccounts,
//             ...dbInsertInstagramAccounts,
//             ...dbInsertPixels,
//           ])
//           .select();
//         // console.log('insertedData', insertedData);
//
//         if (error) {
//           console.error(error);
//         }
//         res = insertedData;
//       }
//     }
//     return { success: true, res };
//   },
// } satisfies Actions;

// async function getCurrencies(locals) {
//   const { data, error: selectError } = await locals.supabase
//     .from('currencies')
//     .select('*');
//   return data;
// }

export const load = (async ({ locals }) => {
  const session = await locals.colocio.getCurrentSession();

  if (session) {
    const userId = session.user.id;
    const profile = await locals.colocio.storage.getUserProfile(userId);
    let currencies = await locals.colocio.storage.getCurrencies();

    if (profile.onboarding_status === 'completed') {
      redirect(303, '/');
    } else {
      const user = await locals.colocio.getCurrentUser();
      if (user) {
        await locals.colocio.storage.createUserProfile(user);
        return { user: userId, currencies };
      }
    }
  }

  // async function checkUserOnboardingStatus() {
  //   try {
  //     const { data, error } = await locals.supabase
  //       .from('user_profile')
  //       .select('onboarding_status')
  //       .eq('uuid', user)
  //       .single();
  //
  //     if (error) {
  //       throw new Error('Could not check profile onboarding status');
  //     }
  //
  //     if (data) {
  //       return data.onboarding_status;
  //     }
  //   } catch (error) {
  //     console.error('Error in checkUserOnboardingStatus', error);
  //   }
  // }

  // async function createProfile() {
  //   try {
  //     const { data, error: selectError } = await locals.supabase
  //       .from('user_profile')
  //       .select('uuid')
  //       .eq('uuid', user)
  //       .single();
  //
  //     if (!data && user) {
  //       const upsert: Database['public']['Tables']['user_profile']['Insert'] = {
  //         uuid: user,
  //         onboarding_status: 'started',
  //       };
  //       const { error: upsertError } = await locals.supabase
  //         .from('user_profile')
  //         .upsert(upsert);
  //
  //       if (upsertError) throw upsertError;
  //     }
  //   } catch (error) {
  //     console.error('Error in createProfile', error);
  //   }
  // }

  // const status = await checkUserOnboardingStatus();
}) satisfies PageServerLoad;
