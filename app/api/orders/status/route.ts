import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase/server';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Token is required' }, { status: 401 });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('book_orders')
      .select('status')
      .eq('order_token', token)
      .maybeSingle();

    if (error) throw error;
    return NextResponse.json({ status: data?.status || 'unknown' });
  } catch (error) {
    console.error('Failed to check order status', error);
    return NextResponse.json({ error: 'Order status is unavailable' }, { status: 503 });
  }
}
