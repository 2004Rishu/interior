# Gap Analysis

| Feature/Component | Current State | Target State | Phase to Fix |
|-------------------|---------------|--------------|--------------|
| **Data Fetching** | Synchronous imports of `MOCK_DESIGNERS` / `MOCK_PROJECTS` or inline hardcoded arrays. | Async repository pattern with TanStack Query. | Phase 2 |
| **Authentication** | `AuthContext` has fake login/signup and no persisted session or real validation. | Full auth flow (login, signup, reset), real Zod validation, JWT/session management, route guards. | Phase 3 |
| **Forms & Validation** | Forms (Contact, Waitlist, StartProject, JoinNetwork) have no validation logic or submission handling. | Zod schemas, React Hook Form, explicit success/error states, real API calls. | Phases 2, 4, 5, 6 |
| **Client Dashboard** | `ClientDashboard.tsx` has inline mock projects. Profile settings form is dead. | Wired to API, dynamic projects, active messaging, working settings. | Phase 5 |
| **Designer Dashboard** | `DesignerDashboard.tsx` uses inline mock data. Actions (accept lead) don't work. | Real lead management, portfolio CRUD, analytics. | Phase 6 |
| **AI Features** | None currently implemented. | Real Gemini API integration for chat, budget, style suggestions. | Phase 7 |
| **Admin Dashboard** | Doesn't exist. | Protected `/admin` routes, user management, CMS, analytics. | Phase 8 |
| **Messaging & Booking** | Hardcoded UI or completely missing. | Real-time-feeling chat, calendar component, notifications. | Phase 9 |
| **Performance** | No lazy loading, images unoptimized. | React.lazy, srcset, memoization. | Phase 10 |
| **Error Handling** | No error boundaries, missing env checks. | Global/Route error boundaries, toast system, env validation. | Phase 2 |

## Inconsistent Patterns Identified
1. **Styling:** Mixed use of standard CSS (e.g., in components/pages if any) and Tailwind. We will enforce Tailwind and extract custom tokens into a theme config.
2. **Prop Drilling vs Context:** `AuthContext` handles user, but forms manage their own fragmented state.
3. **Missing Reusable Components:** Buttons, Inputs, Cards are defined inline inside pages instead of `src/components/ui`.
