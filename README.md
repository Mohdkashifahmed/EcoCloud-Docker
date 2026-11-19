# EcoCloud — Smart Cloud-Based Energy Monitoring System

**Monitor Smart. Save Energy. Build a Greener Future.**

EcoCloud is an intermediate-level Cloud Computing academic project built with React, Vite, Supabase PostgreSQL/Auth/Storage, Recharts and Vercel. It includes a complete local demo that works without cloud credentials and a genuine Supabase integration path.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173). Without `.env.local`, the app starts in **DEMO MODE** with sample appliances. Add/edit/delete, calculations, analytics and CSV export work locally for the running session. Demo data is not cloud data and is not persisted as Supabase records.

## Enable genuine cloud mode

1. Create a free Supabase project.
2. In Supabase SQL Editor, execute `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Project Settings → API.
5. Optionally set `VITE_ADMIN_EMAIL` to the email you will use for the admin UI.
6. Restart `npm run dev`, then use Sign in / Sign up.
7. Confirm your email if email confirmation is enabled.
8. Device CRUD now uses Supabase Postgres through the authenticated client and RLS.

Only the Supabase **anon/publishable** key belongs in the browser. Never put the service-role key in Vite environment variables or commit secrets. Admin UI is a limited client view; organization-wide administration must be implemented with a trusted server/Edge Function.

## Cloud features and boundaries

- Supabase Auth: email/password sign-up, sign-in, session persistence and logout.
- PostgreSQL: profiles, devices, energy readings, electricity rates and recommendations.
- Supabase APIs: device records are read/inserted/updated/deleted through `supabase-js`.
- RLS: every user-scoped table restricts rows to `auth.uid()`.
- Supabase Storage: SQL comments provide a private `energy-exports` bucket policy. Create the bucket in Storage dashboard to enable private file uploads; CSV export currently downloads directly in the browser.
- Vercel: static SPA deployment with `vercel.json` route rewrite.
- Environment configuration: `.env.example`.

## Energy calculation

`Monthly energy (kWh) = (Wattage × Hours per day × 30) / 1000`

`Estimated bill = Total monthly kWh × Tariff per kWh`

This is a schedule-based estimate, not a smart-meter measurement. The included charts contain clearly illustrative sample historical profiles; current appliance totals are calculated from your device list.

## Deployment to Vercel

Push the project to GitHub, import the repository in Vercel, configure the three `VITE_...` environment variables, and deploy. Add your Vercel domain to Supabase Auth → URL Configuration → Site URL and Redirect URLs. Redeploy after changing environment variables.

## Folder map

- `src/components`: reusable sidebar and appliance modal
- `src/pages`: reserved for future page extraction; current page composition is in `App.jsx`
- `src/services`: Supabase client, energy calculations, data access and CSV export
- `supabase/schema.sql`: schema, indexes, triggers and RLS
- `docs`: project report, architecture, viva and test cases

## Notes

- No API key is required to run demo mode.
- Browser-local demo state resets on refresh by design; this avoids misrepresenting local storage as cloud persistence.
- For production, add server-side admin APIs, audit logging, measured IoT ingestion, and automated tests.
