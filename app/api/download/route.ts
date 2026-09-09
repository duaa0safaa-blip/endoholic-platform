import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase/server';

const BOOK_BUCKET = process.env.BOOK_STORAGE_BUCKET || 'books';
const BOOK_PATH = process.env.BOOK_STORAGE_PATH || 'safe-instrumentation-in-endodontics.pdf';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Download token is required' }, { status: 401 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: 'Payment verification is not configured on this deployment' },
      { status: 503 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: order, error } = await supabase
      .from('book_orders')
      .select('status')
      .eq('order_token', token)
      .maybeSingle();

    if (error) throw error;
    if (!order || order.status !== 'verified') {
      return NextResponse.json({ error: 'Payment has not been verified' }, { status: 403 });
    }

    const { data, error: signedUrlError } = await supabase.storage
      .from(BOOK_BUCKET)
      .createSignedUrl(BOOK_PATH, 60 * 15);

    if (signedUrlError) throw signedUrlError;
    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error('Failed to create book download', error);
    return NextResponse.json({ error: 'Download is unavailable' }, { status: 503 });
  }
}
