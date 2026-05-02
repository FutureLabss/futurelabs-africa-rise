# FutureLabs Africa Platform

This project is a comprehensive web platform for **FutureLabs Africa**, an organization focused on technology, innovation, and community development in Africa. It features public-facing information pages, event registration systems, and an administrative dashboard.

## Project Overview

- **Purpose:** Official website and management platform for FutureLabs Africa.
- **Core Features:**
  - Public pages (Home, About, Programs, Community, Startups, Impact).
  - Event discovery and registration system.
  - Blog and news management.
  - Admin dashboard for event and content management.
  - Integration with Supabase for backend services (Auth, Database, RPCs).

## Tech Stack

- **Frontend:** [React](https://reactjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/) (using `HashRouter`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Backend/Database:** [Supabase](https://supabase.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Rich Text Editor:** [TipTap](https://tiptap.dev/) (used in Admin dashboard)
- **Icons:** [Lucide React](https://lucide.dev/)

## Project Structure

```text
C:\Users\savyj\Documents\futurelabs-africa-rise\
├───public\                 # Static assets (images, icons, etc.)
├───src\
│   ├───assets\             # Local image/background assets
│   ├───components\         # Reusable UI components
│   │   ├───admin\          # Admin-specific components
│   │   └───ui\             # shadcn/ui base components
│   ├───data\               # Local data/mock data files
│   ├───hooks\              # Custom React hooks (auth, registrations, etc.)
│   ├───integrations\
│   │   └───supabase\       # Supabase client and generated types
│   ├───lib\                # Utility functions
│   └───pages\              # Main page/route components
│       └───admin\          # Admin dashboard pages
└───supabase\               # Supabase configuration and migrations
```

## Key Development Commands

- `npm run dev`: Starts the development server at `http://localhost:5173`.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Locally previews the production build.

## Development Conventions

- **State Management:** Use TanStack Query for server state and standard React hooks for local state.
- **Styling:** Prefer Tailwind utility classes. Use shadcn/ui components for consistent UI patterns.
- **Database:** Interact with the database through the Supabase client in `@/integrations/supabase/client`. Ensure types are updated if the schema changes.
- **Admin Access:** Admin routes are protected and require specific roles managed via Supabase (see `src/hooks/use-admin-auth.ts`).
- **Routing:** The project uses `HashRouter` for compatibility with certain deployment environments.
