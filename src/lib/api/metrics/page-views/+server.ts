import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Database } from '$types/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getTotalPageViews } from '$lib/services/facebook/Insights';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.getSession();
    const activeEntity = locals.activeEntity;

    if (!session || !activeEntity) {
        throw redirect(301, '/login');
    }

    const supabaseClient = locals.supabase as SupabaseClient<Database>;

    try {
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

        const totalPageViews = await getTotalPageViews(
            facebookPageId,
            facebookPageToken
        );

        if (!totalPageViews)
            throw new Error('Error occured when featching data....');

        const result = totalPageViews.map(pageView => pageView.value);

        return new Response(JSON.stringify({ success: true, result }));
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                message: error.message as string,
            })
        );
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    const session = await locals.getSession();
    const activeEntity = locals.activeEntity;

    if (!session || !activeEntity) {
        throw redirect(301, '/login');
    }

    const supabaseClient = locals.supabase as SupabaseClient<Database>;

    try {
        const date = new Date();
        const yesterday = new Date();
        const dayBeforeYesterday = new Date();

        yesterday.setDate(date.getDate() - 1);
        dayBeforeYesterday.setDate(date.getDate() - 2);

        const requestJson = (await request.json()) as {
            pageViews: number[];
        };

        const userAssetResult = await supabaseClient
            .from('user_assets')
            .select('*, entities!inner(euid)')
            .eq('type', 'facebook_page')
            .eq('entities.euid', activeEntity.euid);

        if (userAssetResult.error) throw userAssetResult.error;

        const facebookPageId = userAssetResult.data[0].asset_id;

        // update yesterday and before day of yesterday page views if exist
        const [yesterdayPageMetrics, dayBeforeYesterdayPageMetrics] =
            await Promise.all([
                supabaseClient
                    .from('facebook_page_metrics')
                    .select('*')
                    .match({
                        page_id: facebookPageId,
                        date: yesterday.toISOString().split('T')[0],
                    }),
                supabaseClient
                    .from('facebook_page_metrics')
                    .select('*')
                    .match({
                        page_id: facebookPageId,
                        date: dayBeforeYesterday
                            .toISOString()
                            .split('T')[0],
                    }),
            ]);

        if (yesterdayPageMetrics.error) throw yesterdayPageMetrics.error;
        if (dayBeforeYesterdayPageMetrics.error)
            throw dayBeforeYesterdayPageMetrics.error;

        if (yesterdayPageMetrics.data.length > 0) {
            await supabaseClient
                .from('facebook_page_metrics')
                .update({ page_views: requestJson.pageViews[1] })
                .match({
                    page_id: facebookPageId,
                    date: yesterday.toISOString().split('T')[0],
                });
        } else {
            await supabaseClient.from('facebook_page_metrics').insert({
                page_id: facebookPageId,
                date: yesterday.toISOString().split('T')[0],
                page_views: requestJson.pageViews[1],
            });
        }

        if (dayBeforeYesterdayPageMetrics.data.length > 0) {
            await supabaseClient
                .from('facebook_page_metrics')
                .update({ page_views: requestJson.pageViews[0] })
                .match({
                    page_id: facebookPageId,
                    date: dayBeforeYesterday.toISOString().split('T')[0],
                });
        } else {
            await supabaseClient.from('facebook_page_metrics').insert({
                page_id: facebookPageId,
                date: dayBeforeYesterday.toISOString().split('T')[0],
                page_views: requestJson.pageViews[0],
            });
        }

        return new Response(JSON.stringify({ success: true }));
    } catch (error: any) {
        console.log(error.message);
        return new Response(JSON.stringify({ success: false }));
    }
};
