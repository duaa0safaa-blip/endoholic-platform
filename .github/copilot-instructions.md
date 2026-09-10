# Copilot instructions for endoholic-platform

## Before writing Next.js code
This repo pins a Next.js version (see `package.json`) that diverges from the
public docs Copilot was trained on. Before suggesting App Router, routing,
config, or data-fetching code, check `node_modules/next/dist/docs/` (via
`AGENTS.md`) for the version actually installed — don't rely on
general Next.js knowledge for API shape or conventions.

## Stack
- Next.js App Router (`app/`), React 19, TypeScript, Tailwind v4.
- Supabase (`@supabase/supabase-js`) for storage/DB. Server-only access goes
  through `lib/supabase/server.ts` (`getSupabaseAdmin()`), which requires
  `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never call this from
  client components; keep the `'server-only'` import at the top of any file
  that touches the service-role client.
- Deployed on Vercel (`vercel.json`).

## Product context
- The site sells the book **"Safe Instrumentation in Endodontics"** for $19
  via manual Zain Cash / Switch Card payment (no card processor
  integration) — see `app/components/PaymentModal.tsx` and
  `app/api/orders/route.ts`.
- Orders are verified manually: `PATCH /api/admin/orders/{orderNumber}`
  guarded by an `x-admin-secret` header checked against
  `ORDER_ADMIN_SECRET`. Treat this secret and `SUPABASE_SERVICE_ROLE_KEY` as
  sensitive — never log them or suggest hardcoding them.
- The purchased PDF is streamed from a private Supabase Storage bucket
  (`BOOK_STORAGE_BUCKET` / `BOOK_STORAGE_PATH`) through
  `app/api/download/route.ts` and rendered in `app/reader/PdfViewer.tsx`
  with a watermark — keep reader access gated behind the existing
  entitlement checks rather than serving the raw file URL.

## Conventions
- `next.config.ts` sets `typescript.ignoreBuildErrors: true` as a deliberate
  temporary CI accommodation — don't remove it as a side effect of an
  unrelated change; flag it if it seems relevant to a task.
- Follow existing file placement: pages/routes under `app/`, shared
  server-only helpers under `lib/`.
