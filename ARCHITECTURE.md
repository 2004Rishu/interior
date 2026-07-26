# Current Architecture Map

## Routes & Pages (`src/App.tsx`)
- `/` -> `Home.tsx` (Reads `MOCK_PROJECTS` for featured spaces)
- `/start-project` -> `StartProject.tsx` (Intake form, no real state persistence)
- `/join-network` -> `JoinNetwork.tsx` (Application form, no submission logic)
- `/designers` -> `Designers.tsx` (Reads `MOCK_DESIGNERS`)
- `/designers/:id` -> `DesignerProfile.tsx` (Reads `MOCK_DESIGNERS`, `MOCK_PROJECTS`)
- `/epoxy-flooring` -> `EpoxyFlooring.tsx` (Static service page)
- `/shop` -> `ShopWaitlist.tsx` (Waitlist form, fake submission)
- `/about` -> `About.tsx` (Static content)
- `/contact` -> `Contact.tsx` (Fake form submission)
- `/login` -> `Login.tsx` (Consumes `useAuth`)
- `/signup` -> `Signup.tsx` (Consumes `useAuth`)
- `/dashboard/client` -> `ClientDashboard.tsx` (Consumes `useAuth`, uses hardcoded `mockProjects` inline)
- `/dashboard/designer` -> `DesignerDashboard.tsx` (Consumes `useAuth`, uses hardcoded data)

## Components
- `Layout.tsx` (Wraps all routes with Header/Footer, missing mobile nav full logic)

## State & Context
- `AuthContext.tsx`: Provides fake authentication state (role: 'client' | 'designer', mocked user object)

## Data & Types (`src/data.ts`)
- `Designer` interface
- `Project` interface
- `MOCK_DESIGNERS` array
- `MOCK_PROJECTS` array

## Data Flow
Currently, data flow is completely synchronous and hardcoded. Components import `MOCK_*` arrays directly or define their own inline mock arrays (e.g. dashboards). There are no repositories, API calls, or global state beyond the simple AuthContext. Forms prevent default submission but do not execute any data mutation.
