import { createPromotion } from '$lib/services/facebook/Promotions';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(301, '/login');
  }
  const user = session.user.id;
  console.log("/api/promotions/server.ts: session:", session);
  console.log("/api/promotions/server.ts: user:", user);

  // NOTE: This is for getting the accsess token from the database.
  //
  // const accessTokenResult = await locals.supabase
  //   .from('access_tokens')
  //   .select('access_token')
  //   .match({ uuid: user, provider: 'facebook' })
  //   .single();
  //
  // if (accessTokenResult.error) throw accessTokenResult.error;
  // const {
  //   data: { access_token: accessToken },
  // } = accessTokenResult;

  // const result = await createPromotion(accessToken, adAccountId);
  console.log("createPromotion moved to another place");
  return json({ success: true, data: "No data available. Yet" });
};
