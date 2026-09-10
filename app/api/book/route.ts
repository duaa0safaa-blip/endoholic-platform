import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const preview = await readFile(
      path.join(process.cwd(), 'private', 'books', 'safe-instrumentation-in-endodontics-preview.pdf'),
    );

    return new NextResponse(preview, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store, max-age=0',
        'Content-Disposition': 'inline; filename="safe-instrumentation-in-endodontics-preview.pdf"',
      },
    });
  } catch (error) {
    console.error('Failed to load book preview', error);
    return new NextResponse('Book preview is unavailable', { status: 503 });
  }
}
