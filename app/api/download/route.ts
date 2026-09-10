import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getSupabaseAdmin } from '../../../lib/supabase/server';

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

    const book = await readFile(path.join(process.cwd(), 'private', 'books', BOOK_PATH));
    return new NextResponse(book, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Disposition': 'inline; filename="safe-instrumentation-in-endodontics.pdf"',
      },
    });
  } catch (error) {
    console.error('Failed to create book download', error);
    return NextResponse.json({ error: 'Download is unavailable' }, { status: 503 });
  }
}
