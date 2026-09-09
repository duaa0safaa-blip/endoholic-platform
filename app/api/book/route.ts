import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  try {
    const preview = await readFile(
      path.join(process.cwd(), 'private', 'books', 'safe-instrumentation-in-endodontics-preview.pdf'),
    );

    return new NextResponse(preview, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Disposition': 'inline; filename="safe-instrumentation-in-endodontics-preview.pdf"',
      },
    });
  } catch (error) {
    console.error('Failed to load book preview', error);
    return new NextResponse('Book preview is unavailable', { status: 503 });
  }
}
