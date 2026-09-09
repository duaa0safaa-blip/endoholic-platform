import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { getSupabaseAdmin } from '../../../lib/supabase/server';

const PRICE_USD = 19;
const paymentMethods = new Set(['zain_cash', 'switch_card']);

export async function POST(request: Request) {
  let body: { name?: string; email?: string; paymentMethod?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const paymentMethod = body.paymentMethod;

  if (!name || !email || !email.includes('@') || !paymentMethod || !paymentMethods.has(paymentMethod)) {
    return NextResponse.json({ error: 'Name, email, and a valid payment method are required' }, { status: 400 });
  }

  const orderToken = randomUUID();
  const localOrderNumber = `ENDO-${orderToken.replaceAll('-', '').slice(0, 8).toUpperCase()}`;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      orderNumber: localOrderNumber,
      orderToken,
      amountUsd: PRICE_USD,
      manualOnly: true,
    });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('book_orders')
      .insert({
        name,
        email,
        payment_method: paymentMethod,
        amount_usd: PRICE_USD,
        order_token: orderToken,
        status: 'pending',
      })
      .select('order_number')
      .single();

    if (error) throw error;

    return NextResponse.json({
      orderNumber: data.order_number,
      orderToken,
      amountUsd: PRICE_USD,
    });
  } catch (error) {
    console.error('Failed to create book order', error);
    return NextResponse.json({ error: 'Checkout is not configured yet' }, { status: 503 });
  }
}
