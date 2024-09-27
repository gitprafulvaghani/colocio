import type { RequestHandler } from './$types';
import { getTotalPageViews } from '$lib/services/facebook/Insights';

export const GET: RequestHandler = async ({ locals: { colocio } }) => {
  try {
    // Get all facebook pages
    const facebookPagesData = await colocio.storage.getAllFacebookPages();

    for (const facebookPage of facebookPagesData) {
      const facebookPageId = facebookPage.asset_id;
      const facebookPageToken = (facebookPage.data as { access_token: string })
        .access_token;

      const totalPageViews = await getTotalPageViews(
        facebookPageId,
        facebookPageToken
      );

      if (!totalPageViews) {
        continue;
      }

      // Save the fetched data into DB
      const date = new Date();
      const yesterday = new Date();
      const dayBeforeYesterday = new Date();

      yesterday.setDate(date.getDate() - 1);
      dayBeforeYesterday.setDate(date.getDate() - 2);

      // update yesterday and before day of yesterday page views if exist
      const [yesterdayPageMetrics, dayBeforeYesterdayPageMetrics] =
        await Promise.all([
          colocio.storage.getFacebookPageMetricsByDate(
            facebookPageId,
            yesterday.toISOString().split('T')[0]
          ),
          colocio.storage.getFacebookPageMetricsByDate(
            facebookPageId,
            dayBeforeYesterday.toISOString().split('T')[0]
          ),
        ]);

      if (yesterdayPageMetrics.length > 0) {
        await colocio.storage.updateFacebookPageViews(
          facebookPageId,
          yesterday.toISOString().split('T')[0],
          totalPageViews[1].value
        );
      } else {
        await colocio.storage.addFacebookPageViews(
          facebookPageId,
          yesterday.toISOString().split('T')[0],
          totalPageViews[1].value
        );
      }

      if (dayBeforeYesterdayPageMetrics.length > 0) {
        await colocio.storage.updateFacebookPageViews(
          facebookPageId,
          dayBeforeYesterday.toISOString().split('T')[0],
          totalPageViews[0].value
        );
      } else {
        await colocio.storage.addFacebookPageViews(
          facebookPageId,
          dayBeforeYesterday.toISOString().split('T')[0],
          totalPageViews[0].value
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
      })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message as string,
      })
    );
  }
};
