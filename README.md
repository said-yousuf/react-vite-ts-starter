# ⚡ React + TypeScript + Vite Starter

A modern, minimal, and extensible starter for building React applications with TypeScript, Vite, Tailwind CSS, and a rich set of developer tools.

---

## Features

- **React 19** with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development and builds
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) and [Lucide Icons](https://lucide.dev/) for accessible and customizable UI components
- [React Router v7](https://reactrouter.com/) for routing
- [React Hook Form](https://react-hook-form.com/) for forms
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [SWR](https://swr.vercel.app/) for data fetching
- [ESLint](https://eslint.org/) with recommended, React, and TypeScript rules
- [Class Variance Authority](https://cva.style/) and [clsx](https://github.com/lukeed/clsx) for manageable class names
- [Sonner](https://sonner.emilkowal.ski/) for notifications
- [@elhamdev/tracejs](https://www.npmjs.com/package/@elhamdev/tracejs)

---

## Getting Started

### 1️⃣ Install Dependencies

```sh
pnpm install
# or
npm install
# or
yarn install
```

### 2️⃣ Start the Development Server

```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```

The app will be available at http://localhost:5173 (or the port configured by Vite).

## Project Structure

```
src/
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  lib/             # Utilities and helpers
  styles/          # Global and Tailwind CSS
  App.tsx          # Main app component
  main.tsx         # Entry point
public/            # Static assets
```

## Scripts

- `dev` – Start the Vite dev server
- `build` – Type‑check and build for production
- `preview` – Preview the production build
- `lint` – Run ESLint across the codebase

## Linting & Formatting

ESLint is configured for TypeScript, React, and hooks. To lint the codebase:

```sh
pnpm lint
```

ESLint settings can be found in `eslint.config.js`. Type‑aware rules are enabled for stricter checks.

## Tailwind CSS

Tailwind is integrated via `@tailwindcss/vite`. Global styles are located in `src/styles/globals.css`. Tailwind can be configured in `tailwind.config.js` (if present).

## Customization

- **UI Components:** Uses [shadcn/ui](https://ui.shadcn.com/) and Hero icons react for highly customizable and accessible interfaces.
- **State Management:** Zustand is included for global state.
- **Data Fetching:** SWR is included for seamless data fetching and caching.

## TypeScript

- Strict mode is enabled.
- Project references configured for scalability.
- Import aliases configured in `tsconfig.json` and `vite.config.ts`.

## Useful Links

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/overview.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/overview)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs/installation)
- [Lucide Icons](https://lucide.dev/docs/overview/)
- [SWR Documentation](https://swr.vercel.app/docs/getting-started)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [React Router Documentation](https://reactrouter.com/)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)

## License

This project is licensed under the MIT License.

---
