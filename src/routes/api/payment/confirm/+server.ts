import { type EmailOtpType } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
  const token_hash = url.searchParams.get('token_hash') ?? '';
  const type = url.searchParams.get('type') as EmailOtpType;

  // If token_hash or type is empty, return an error response
  if (!token_hash || !type) {
    console.error('<API:Payment> Missing token_hash or type parameter');
    return json(
      { error: 'Missing token_hash or type parameter' },
      { status: 400 }
    );
  }

  if (type === 'magiclink') {
    console.log('<API:Payment> Verifying OTP for magiclink');
    const isVerified = await locals.colocio.verifyOTP(token_hash, type);

    if (isVerified) {
      console.log('<API:Payment> OTP verification successful');
      // TODO: Create user profile here
      const userId = await locals.colocio.getCurrentUser();
      if (userId) {
        await locals.colocio.storage.createUserProfile(userId);
      }
      return json({ success: true }, { status: 200 });
    } else {
      console.error('<API:Payment> OTP verification failed');
      return json(
        { success: false, message: 'OTP verification failed' },
        { status: 400 }
      );
    }
  }

  console.error('<API:Payment> Invalid OTP type');
  return json({ success: false, message: 'Invalid OTP type' }, { status: 400 });
};
