# Target Enterprise Structure & Migration Plan

## Target Folder Structure
```text
src/
├── ai/                 # AI features and centralized prompts
│   ├── prompts/
│   └── ai.repository.ts
├── api/                # Service layer (Repository pattern)
│   ├── auth.repository.ts
│   ├── designers.repository.ts
│   ├── projects.repository.ts
│   └── ...
├── components/         # Shared UI components
│   ├── ui/             # Generic atomic components (Button, Input, Card)
│   ├── layout/         # Header, Footer, Layout wrapper
│   └── shared/         # Cross-feature components (e.g., DesignerCard)
├── config/             # Environment & global configurations
│   └── env.ts
├── context/            # React contexts (e.g., Auth, Theme)
├── features/           # Domain-driven feature modules
│   ├── client/
│   ├── designer/
│   ├── admin/
│   └── public/
├── hooks/              # Reusable React hooks
├── lib/                # Third-party wrappers (storage, analytics)
├── types/              # Global TypeScript interfaces
├── utils/              # Pure utility functions (formatting, validation)
├── App.tsx             # Root component and Router config
└── main.tsx            # Entry point
```

## Migration Checklist (Risk-Ordered)

1. **[ ] Move generic types to `src/types/`**
   - Extract `Designer` and `Project` from `src/data.ts` to `src/types/models.ts`.
2. **[ ] Relocate mock data**
   - Move `MOCK_DESIGNERS` and `MOCK_PROJECTS` to a temporary `src/api/mocks.ts` file until Phase 2 builds the repositories.
3. **[ ] Reorganize UI components**
   - Create `src/components/layout/` and move `Layout.tsx` there.
4. **[ ] Extract pages to features**
   - Move public pages (Home, About, Contact, Designers) to `src/features/public/pages/`.
   - Move dashboard pages to `src/features/client/pages/` and `src/features/designer/pages/`.
   - Update `App.tsx` imports.
5. **[ ] Verify Build**
   - Run `npm run build` and ensure no imports are broken.
