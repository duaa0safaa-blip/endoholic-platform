import { NextResponse } from 'next/server';

// The sample book source is proxied through our own server instead of being
// fetched directly from a public URL, so the raw file location isn't exposed
// to anyone inspecting network requests in the browser. This also gives us a
// single place to add real per-user access control once accounts exist.
const SOURCE_URL =
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';

// The sample PDF is identical for every visitor, so the response is prerendered
// and served from Vercel's CDN, and only revalidated against the upstream
// source once an hour — this is what keeps a traffic spike from turning into
// thousands of concurrent upstream fetches.
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  let upstream: Response;
  try {
    upstream = await fetch(SOURCE_URL, {
      next: { revalidate },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return new NextResponse('Failed to load document', { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new NextResponse('Failed to load document', { status: 502 });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Cache-Control': `public, max-age=60, s-maxage=${revalidate}, stale-while-revalidate=86400`,
      'Content-Disposition': 'inline',
    },
  });
}
