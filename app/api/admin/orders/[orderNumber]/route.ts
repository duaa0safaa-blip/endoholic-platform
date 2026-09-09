import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../../lib/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> },
) {
  const expectedSecret = process.env.ORDER_ADMIN_SECRET;
  if (!expectedSecret || request.headers.get('x-admin-secret') !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderNumber } = await params;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('book_orders')
      .update({ status: 'verified', verified_at: new Date().toISOString() })
      .eq('order_number', orderNumber);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to verify book order', error);
    return NextResponse.json({ error: 'Could not verify order' }, { status: 503 });
  }
}
