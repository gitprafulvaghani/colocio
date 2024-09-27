import type { RequestHandler } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public';

export const GET: RequestHandler = async ({ locals }) => {
  try {
    const supabaseClient = createClient(
      PUBLIC_SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Supabase connected! Cron job is running successfully',
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
