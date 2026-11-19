# EcoCloud — Project Documentation

## Abstract
EcoCloud is a cloud-ready energy monitoring web application designed to help households, colleges and organizations understand electricity consumption at appliance level. Users register appliances with power rating and operating hours; the system estimates monthly energy in kWh, calculates cost using a configurable tariff, visualizes usage patterns and provides rule-based energy-saving recommendations. Supabase provides managed authentication, PostgreSQL storage and row-level security. A clearly identified local demo mode supports evaluation without cloud credentials.

## 1. Introduction
Electricity demand is increasing while consumers often receive only a periodic bill with limited visibility into which appliances contribute most. EcoCloud translates appliance schedules into understandable consumption estimates and gives users a practical interface for monitoring and decision-making.

## 2. Problem statement
Users lack an accessible, centralized way to record appliance-level energy assumptions, estimate costs, compare consumption and identify waste. Manual calculations are inconvenient and a static dashboard cannot demonstrate cloud concepts such as authentication, remote persistence and access isolation.

## 3. Objectives
- Provide secure user registration and login.
- Maintain an appliance inventory with CRUD operations.
- Estimate monthly consumption using a standard kWh formula.
- Calculate electricity cost from a configurable tariff.
- Visualize daily, monthly and appliance-level trends.
- Generate actionable energy-saving recommendations.
- Export structured reports as CSV.
- Demonstrate managed cloud database, APIs, RLS and deployment.

## 4. Existing system
Traditional bills show aggregate consumption and cost. Spreadsheet/manual tracking requires repeated data entry and offers limited collaboration, access control and visualization. Some monitoring solutions require dedicated hardware.

## 5. Proposed system
EcoCloud provides a responsive web interface, a React client, Supabase Auth, PostgreSQL tables and RLS policies. Users can run a local demo immediately or configure Supabase for genuine remote account and device storage.

## 6. System architecture
See `ARCHITECTURE.md`. Browser UI calls Supabase APIs over HTTPS using the public anon key and the authenticated user's JWT. PostgreSQL RLS evaluates `auth.uid()` before returning or modifying user records. Vercel serves the static Vite build.

## 7. Technologies used
| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite | Component UI and build |
| Styling | CSS | Responsive SaaS interface |
| Charts | Recharts | Energy visualizations |
| Icons | Lucide React | Interface iconography |
| Backend | Supabase | Managed backend platform |
| Database | PostgreSQL | Relational persistence |
| Authentication | Supabase Auth | Identity and sessions |
| Storage | Supabase Storage | Optional private export bucket |
| Deployment | Vercel | Static hosting / CDN |
| Version control | GitHub | Source management |

## 8. Hardware and software requirements
- Client: laptop/desktop or smartphone with modern browser.
- Development: Node.js 18+, npm, VS Code and Git.
- Cloud: free-tier Supabase project and Vercel account.
- Internet required for cloud mode and package installation.

## 9. Module descriptions
1. Landing/authentication: sign-in and registration via Supabase Auth; demo entry is available without credentials.
2. Dashboard: energy, bill, appliance and savings metrics with weekly/monthly charts.
3. Device management: create, edit, delete and activate appliances.
4. Analytics: daily/weekly/monthly chart views and ranked device table.
5. Recommendations: deterministic rules based on runtime and estimated monthly kWh.
6. Billing: editable tariff and appliance-level cost breakdown.
7. Reports: CSV download for appliance-level data.
8. Admin: limited client-side workspace summary; not a privileged cross-tenant admin API.
9. Settings: cloud/demo state and tariff configuration.

## 10. Database design
- `profiles`: one profile per `auth.users` row.
- `devices`: many appliances per user.
- `energy_readings`: optional measured/imported readings linked to a user and optionally a device.
- `electricity_rates`: dated tariff history per user.
- `recommendations`: generated/user-scoped recommendations, optionally linked to a device.

All user-owned records reference `auth.users(id)` with cascade deletion. Indexes support user-scoped lookups and time-series ordering.

## 11. Cloud computing concepts
- SaaS-style browser application hosted on Vercel.
- Backend-as-a-Service via Supabase.
- Managed relational database and REST APIs.
- Identity and JWT-based authorization through Supabase Auth.
- Multi-tenant isolation through PostgreSQL RLS.
- Object storage through Supabase Storage (private bucket setup documented in SQL).
- Environment-based configuration keeps credentials outside source control.
- Elastic managed infrastructure is provided by the cloud platform.

## 12. Implementation details
The frontend uses React state for the local demo and `supabase-js` for cloud persistence. Cloud CRUD functions scope reads by `user_id`; database policies independently enforce access. Energy computations are pure functions and share one formula across cards, analytics, recommendations and exports. CSV generation uses browser Blob APIs.

## 13. Testing
Refer to `TEST_CASES.md`. Manual tests cover CRUD, validation, calculation, tariff changes, CSV output, auth errors, RLS isolation and responsive layout. Run `npm run build` before deployment.

## 14. Advantages
- Easy to use and responsive.
- No physical meter required for the schedule-estimation demo.
- Clear distinction between demo and cloud data.
- Secure user-scoped data policies.
- Extensible schema for IoT readings.
- Downloadable CSV reports.

## 15. Limitations
- Appliance usage is estimated from entered schedules, not measured by smart plugs.
- Historical chart series are illustrative sample data.
- The admin screen is intentionally limited; safe cross-user administration requires server-side privileged code.
- Billing model excludes fixed fees, taxes and slab tariffs.
- Demo state is session-only and resets on refresh.
- Storage bucket must be created in Supabase dashboard before object uploads can be used.

## 16. Future enhancements
- ESP32/smart-meter ingestion through authenticated Edge Functions.
- Real-time energy updates using Supabase Realtime.
- Time-of-use tariff and tax calculation.
- Organization/college multi-site hierarchy.
- Server-side admin console and audit trail.
- Scheduled reports and email alerts.
- Forecasting using time-series machine learning.

## 17. Team member responsibilities
1. Team Leader + Frontend Integration: requirements, React architecture, integration, sprint coordination and final presentation.
2. UI/UX + Dashboard Development: design system, responsive layouts, dashboard cards, charts and accessibility.
3. Cloud Database + Authentication: Supabase project, schema, Auth, RLS policies, Storage setup and cloud testing.
4. Application Logic + Analytics: energy formula, tariff logic, recommendations, chart data and CSV reports.
5. Testing + Deployment + Documentation: test cases, regression checks, Vercel/GitHub deployment, README, report and viva preparation.

## 18. Conclusion
EcoCloud demonstrates how a modern cloud platform can support an energy-awareness application. It combines an approachable React interface with managed identity, relational cloud persistence, API access and database-level security. Its estimation-first model is suitable for an academic working demo and provides a clear path toward IoT-based measurement.

## References
- React documentation: https://react.dev/
- Vite documentation: https://vite.dev/
- Supabase documentation: https://supabase.com/docs
- PostgreSQL documentation: https://www.postgresql.org/docs/
- Recharts documentation: https://recharts.org/
- Vercel documentation: https://vercel.com/docs
