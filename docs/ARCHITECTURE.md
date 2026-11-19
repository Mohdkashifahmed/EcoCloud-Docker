# EcoCloud Architecture

```mermaid
flowchart TB
    U[Household / College User] --> B[Browser: React + Vite UI]
    B -->|HTTPS| V[Vercel CDN / Static Hosting]
    B -->|Supabase JS + JWT| A[Supabase Auth]
    B -->|REST / PostgREST| P[(Supabase PostgreSQL)]
    B -->|Optional object API| S[Supabase Storage]
    A -->|JWT identity| P
    P --> R{PostgreSQL RLS}
    R -->|auth.uid() matches user_id| D[(Profiles / Devices / Readings / Rates / Recommendations)]
    D --> B
```

## Request flow
1. Vercel serves the static React application.
2. Supabase Auth validates email/password and returns a session JWT.
3. The browser sends requests to Supabase APIs with the public anon key and session JWT.
4. PostgreSQL evaluates row-level security policies using `auth.uid()`.
5. Only records belonging to the authenticated user are returned or changed.
6. The UI recalculates consumption and renders charts from the resulting device records.

## Trust boundaries
- Browser: untrusted client; validation improves UX but is not a security boundary.
- Supabase anon key: public client key; RLS is mandatory.
- Service role key: privileged secret; never expose in browser or commit to Git.
- PostgreSQL: authoritative enforcement point for user data ownership.
- Storage: private bucket with per-user object path policies.

## Data relationships
- `auth.users` 1—1 `profiles`
- `auth.users` 1—N `devices`
- `auth.users` 1—N `energy_readings`
- `devices` 1—N `energy_readings` (optional device reference)
- `auth.users` 1—N `electricity_rates`
- `auth.users` 1—N `recommendations`
- `devices` 1—N `recommendations` (optional device reference)

## Cloud vs demo
Demo mode uses in-memory sample objects and browser calculations only. Cloud mode requires Supabase environment variables and a signed-in session; device CRUD is then performed against the remote PostgreSQL database through Supabase APIs. The header and sidebar display the active mode.
