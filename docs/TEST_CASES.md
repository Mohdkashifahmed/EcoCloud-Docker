# EcoCloud Test Cases

| ID | Test | Steps | Expected result |
|---|---|---|---|
| TC01 | Demo startup | Run `npm run dev` without env vars | App opens in DEMO MODE |
| TC02 | Dashboard metrics | Inspect seeded devices | kWh and bill values render |
| TC03 | Add appliance | Add 100 W device for 2 h/day | Device appears; monthly energy = 6 kWh |
| TC04 | Edit appliance | Change wattage to 200 W | Monthly energy updates to 12 kWh |
| TC05 | Delete appliance | Delete a seeded device and confirm | Device disappears |
| TC06 | Toggle status | Switch active device off | Status changes and active count updates |
| TC07 | Validation | Submit empty name or 25 runtime hours | Inline validation error |
| TC08 | Search | Search by category or appliance name | Only matching devices show |
| TC09 | Tariff | Change tariff from ₹7.5 to ₹10 | Estimated bill recalculates |
| TC10 | CSV export | Click Download CSV | Browser downloads CSV file |
| TC11 | Analytics | Open Analytics | Charts and device ranking render |
| TC12 | Recommendations | Open Recommendations | Rule-based tips are shown |
| TC13 | Auth unavailable | Open login without env vars | Clear credential notice; demo remains usable |
| TC14 | Supabase signup | Configure keys and create account | Supabase Auth creates user |
| TC15 | Cloud CRUD | Add device while authenticated | Record is inserted in remote devices table |
| TC16 | RLS isolation | User A queries User B device UUID | No unauthorized row access |
| TC17 | Logout | Sign out from cloud session | Supabase session is cleared |
| TC18 | Responsive | Use viewport below 760 px | Sidebar becomes drawer; grids stack |
| TC19 | Production build | Run `npm run build` | Vite creates `dist/` |
| TC20 | Direct route fallback | Refresh deployed SPA URL | Vercel rewrite serves index.html |

## Manual security verification
Create two test accounts. Insert a device as account A. Sign in as account B and verify that the row is not visible. Attempt a direct API read for A's UUID while authenticated as B; RLS must return no row. Confirm that the browser bundle contains no service-role key.
