import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as userAccount from '$lib/services/userAccount';
import * as facebookAccounts from '$lib/services/facebook/Accounts';
import type { Database } from '$types/supabase';

export const GET: RequestHandler = async ({ request, locals }) => {
    console.log('GET /api/facebook/accounts');
    const session = await locals.getSession();
    const user = session?.user.id;

    let data;

    if (!user) {
        redirect(301, '/login');
    }

    if (session && user) {
        const fb_access_token = await userAccount.getUserAccessToken(
            user,
            'facebook',
            locals.supabase
        );
        if (await facebookAccounts.isValidToken(fb_access_token)) {
            const [adAccounts, businessAccounts, pages] =
                await Promise.all([
                    facebookAccounts.getAdAccounts(fb_access_token),
                    facebookAccounts.getBusinessAccounts(fb_access_token),
                    facebookAccounts.getPages(fb_access_token),
                ]);
            // Instagram accounts are fetched from the pages endpoint.
            // So we call the getInstagramAccounts function after the
            // getPages function.
            const instagramAccounts =
                await facebookAccounts.getInstagramAccounts(
                    pages,
                    fb_access_token
                );
            // Pixels need to be fetched from the ad accounts
            // endpoint. So we call the getPixels function after the
            // getAdAccounts function.
            const pixels = await facebookAccounts.getPixels(
                businessAccounts,
                fb_access_token
            );

            const dbInsertAdAccounts: DB.user_assets[] = adAccounts.map(
                account => ({
                    uuid: user,
                    asset_id: account.id,
                    type: 'facebook_ad_account',
                    data: {
                        name: account.name,
                        account_status: account.account_status,
                        currency: account.currency,
                        timezone_id: account.timezone_id,
                        owner: account.owner,
                        business: account.business,
                        is_prepay_account: account.is_prepay_account,
                        user_tasks: account.user_tasks,
                        created_time: account.created_time,
                        funding_source_details:
                            account.funding_source_details,
                        end_advertiser_name: account.end_advertiser_name,
                        end_advertiser: account.end_advertiser,
                    },
                })
            );

            const dbInsertPages: DB.user_assets[] = pages.map(page => ({
                uuid: user,
                asset_id: page.id,
                type: 'facebook_page',
                data: {
                    // TODO: Here the access token is a page token
                    // (does not expire). Debate if we should
                    // store the page token in the access_tokens
                    // table or if we should keep it in this table
                    // (user_assets.data->access_token).
                    name: page.name,
                    access_token: page.access_token,
                    category: page.category,
                    tasks: page.tasks,
                    about: page.about,
                    profile_picture_url: page.profile_picture_url,
                },
            }));

            const dbInsertBusinessAccounts: DB.user_assets[] =
                businessAccounts.map(account => ({
                    uuid: user,
                    asset_id: account.id,
                    type: 'facebook_business_account',
                    data: {
                        name: account.name,
                        profile_picture_url: account.profile_picture_uri,
                        verification_status: account.verification_status,
                        vertical: account.vertical,
                        timezone_id: account.timezone_id,
                        two_factor_type: account.two_factor_type,
                        primary_page_id: account.primary_page?.id,
                    },
                    // TODO: Update the entities table with the
                    // timezone_id.
                }));

            const dbInsertInstagramAccounts: DB.user_assets[] =
                instagramAccounts.map(account => ({
                    uuid: user,
                    asset_id: account.id,
                    type: 'instagram_account',
                    data: {
                        username: account.username,
                        name: account.name,
                        biography: account.biography,
                        profile_picture_url: account.profile_picture_url,
                        followers_count: account.followers_count,
                        follows_count: account.follows_count,
                    },
                }));

            const dbInsertPixels: DB.user_assets[] = pixels.map(
                pixel => ({
                    uuid: user,
                    asset_id: pixel.id,
                    type: 'facebook_pixel',
                    data: {
                        name: pixel.name,
                        code: pixel.code,
                        owner_ad_account_id:
                            pixel.owner_ad_account.account_id,
                    },
                })
            );

            const { error } = await locals.supabase
                .from('user_assets')
                .upsert([
                    ...dbInsertAdAccounts,
                    ...dbInsertPages,
                    ...dbInsertBusinessAccounts,
                    ...dbInsertInstagramAccounts,
                    ...dbInsertPixels,
                ]);

            if (error) {
                console.error(error);
            }
        }

        // Get the new data from the database using the rpc function from
        // supabase

        try {
            const { data: newData, error } = await locals.supabase
                .rpc('filter_user_assets_gpt')
                .eq('uuid', user);

            data = newData;
        } catch (error) {}
    }

    return json({ success: true, data }, { status: 200 });
};
