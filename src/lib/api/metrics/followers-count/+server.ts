import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Database } from '$types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getFollowersCount } from '$lib/services/facebook/Insights';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();
    const activeEntity = locals.activeEntity;

    if (!session || !activeEntity) {
        throw redirect(301, '/login');
    }

    const supabaseClient = locals.supabase as SupabaseClient<Database>;

    try {
        const date = new Date();
        const dayBeforeYesterday = new Date();

        dayBeforeYesterday.setDate(date.getDate() - 2);

        const userAssetResult = await supabaseClient
            .from('user_assets')
            .select('*, entities!inner(euid)')
            .eq('type', 'facebook_page')
            .eq('entities.euid', activeEntity.euid);

        if (userAssetResult.error) throw userAssetResult.error;

        const facebookPageId = userAssetResult.data[0].asset_id;
        const facebookPageToken = (
            userAssetResult.data[0].data as { access_token: string }
        ).access_token;

        const yesterdayFollowersCount = await getFollowersCount(
            facebookPageId,
            facebookPageToken
        );

        const {
            data: dayBeforeYesterdayPageMetrics,
            error: dayBeforeYesterdayPageMetricsError,
        } = await supabaseClient
            .from('facebook_page_metrics')
            .select('page_likes')
            .match({
                page_id: facebookPageId,
                date: dayBeforeYesterday.toISOString().split('T')[0],
            });

        if (dayBeforeYesterdayPageMetricsError)
            throw dayBeforeYesterdayPageMetricsError;

        let result: number[] = [0, yesterdayFollowersCount ?? 0];

        if (dayBeforeYesterdayPageMetrics.length) {
            result[0] = dayBeforeYesterdayPageMetrics[0].page_likes ?? 0;
        }

        return new Response(
            JSON.stringify({
                success: true,
                result: result,
            })
        );
    } catch (error: any) {
        console.log(error.message);

        return new Response(
            JSON.stringify({
                success: false,
                message: error.message as string,
            })
        );
    }
};

// save the followers count daily basis
export const POST: RequestHandler = async ({ locals, request }) => {
    const session = await locals.getSession();
    const activeEntity = locals.activeEntity;

    if (!session || !activeEntity) {
        throw redirect(301, '/login');
    }

    const supabaseClient = locals.supabase as SupabaseClient<Database>;

    try {
        const date = new Date();
        date.setDate(date.getDate() - 1);

        const requestJson = (await request.json()) as {
            count: number;
        };

        const userAssetResult = await supabaseClient
            .from('user_assets')
            .select('*, entities!inner(euid)')
            .eq('type', 'facebook_page')
            .eq('entities.euid', activeEntity.euid);

        if (userAssetResult.error) throw userAssetResult.error;

        const facebookPageId = userAssetResult.data[0].asset_id;

        const { data: pageMetrics, error: pageMetricsError } =
            await supabaseClient
                .from('facebook_page_metrics')
                .select('*')
                .match({
                    page_id: facebookPageId,
                    date: date.toISOString().split('T')[0],
                });

        if (pageMetricsError) throw pageMetricsError;

        if (pageMetrics.length > 0) {
            await supabaseClient
                .from('facebook_page_metrics')
                .update({ page_likes: requestJson.count })
                .match({
                    page_id: facebookPageId,
                    date: date.toISOString().split('T')[0],
                });
        } else {
            await supabaseClient.from('facebook_page_metrics').insert({
                page_id: facebookPageId,
                date: date.toISOString().split('T')[0],
                page_likes: requestJson.count,
            });
        }

        return new Response(JSON.stringify({ success: true }));
    } catch (error: any) {
        console.log(error.message);
        return new Response(
            JSON.stringify({ success: false, result: null })
        );
    }
};
