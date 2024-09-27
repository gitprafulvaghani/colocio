import type { RequestHandler } from './$types';
import { getFollowersCount } from '$lib/services/facebook/Insights';

export const GET: RequestHandler = async ({ locals: { colocio } }) => {
  //TODO: Move all FB related methods to file: FacebookService
  //TODO: Merge /lib/facebook/Insights into FacebookService
  // @Asher
  try {
    // Get all facebook pages
    const facebookPagesData = await colocio.storage.getAllFacebookPages();

    for (const facebookPage of facebookPagesData) {
      const facebookPageId = facebookPage.asset_id;
      const facebookPageToken = (facebookPage.data as { access_token: string })
        .access_token;

      const yesterdayFollowersCount = await getFollowersCount(
        facebookPageId,
        facebookPageToken
      );

      // Save data to the table
      // TODO: move this transformation inside the actual method (getFacebookPageMetricsByDate)
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const pageMetrics = await colocio.storage.getFacebookPageMetricsByDate(
        facebookPageId,
        date.toISOString().split('T')[0]
      );

      if (pageMetrics.length > 0) {
        await colocio.storage.updateFacebookPageLikes(
          facebookPageId,
          date.toISOString().split('T')[0],
          yesterdayFollowersCount ?? 0
        );
      } else {
        await colocio.storage.addFacebookPageLikes(
          facebookPageId,
          date.toISOString().split('T')[0],
          yesterdayFollowersCount ?? 0
        );
      }
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message as string,
      })
    );
  }
};
