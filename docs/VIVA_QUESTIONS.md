# EcoCloud — Viva Questions and Answers

1. **What is EcoCloud?** A cloud-based web application that estimates appliance-level energy use, costs and efficiency opportunities.
2. **Why is this a Cloud Computing project?** It uses managed cloud authentication, PostgreSQL, APIs, object storage configuration and cloud hosting rather than only a static local page.
3. **What is SaaS?** Software as a Service; users access hosted application functionality through a browser.
4. **What is Supabase?** An open-source Firebase alternative providing managed PostgreSQL, Auth, APIs, Storage and related services.
5. **Why PostgreSQL?** It is a reliable relational database with constraints, indexes, transactions and row-level security.
6. **What is Supabase Auth?** A managed identity service for registration, login, sessions and JWT issuance.
7. **What is RLS?** Row Level Security; database policies determine which rows a database role can read or modify.
8. **Why is RLS important?** It protects tenant data even if a client attempts to query another user's records.
9. **What does `auth.uid()` return?** The UUID of the authenticated user from the JWT context.
10. **Why should the service-role key not be used in React?** It bypasses RLS and would expose privileged access to every browser user.
11. **What is the monthly energy formula?** (Wattage × hours per day × 30) / 1000, giving kWh.
12. **What is one kWh?** Energy consumed by a 1 kW load operating for one hour.
13. **How is the bill estimated?** Total monthly kWh multiplied by the configured tariff per kWh.
14. **Are the charts measured smart-meter readings?** No. Appliance totals are schedule-based estimates; historical chart samples are illustrative.
15. **What is Vite?** A frontend build tool and development server with fast module updates.
16. **Why React?** It supports reusable components and state-driven interactive interfaces.
17. **What is Recharts?** A React charting library used for line, area, bar and pie visualizations.
18. **What is Vercel used for?** Hosting the production static build and distributing it through a CDN.
19. **What is an environment variable?** Configuration supplied outside source code, such as a Supabase URL and public anon key.
20. **What is Supabase Storage?** Managed object storage for files such as exports and user uploads.
21. **What is a foreign key?** A constraint that maintains a valid relationship between rows in related tables.
22. **Why are indexes used?** They speed up common lookups, such as fetching a user's devices or recent readings.
23. **What is the difference between demo and cloud mode?** Demo mode uses sample in-memory data; cloud mode authenticates and persists device data in Supabase.
24. **How can IoT be added?** Devices such as ESP32 can send authenticated readings to a server/Edge Function that validates and inserts records.
25. **What are the limitations?** Estimates rely on user-entered schedules, charts include sample history, and the bill excludes taxes/fixed charges/slab tariffs.
