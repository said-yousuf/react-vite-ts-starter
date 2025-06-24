# React + TypeScript + Vite Template

A modern, minimal, and extensible template for building React applications with TypeScript, Vite, Tailwind CSS, and a rich set of developer tools.

---

## Features

- **React 19** with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development and builds
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) and [Lucide Icons](https://lucide.dev/) for accessible UI primitives and icons
- [React Router v7](https://reactrouter.com/) for routing
- [React Hook Form](https://react-hook-form.com/) for forms
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [SWR](https://swr.vercel.app/) for data fetching
- [ESLint](https://eslint.org/) with recommended, React, and TypeScript rules
- [Class variance authority](https://cva.style/) and [clsx](https://github.com/lukeed/clsx) for class management
- [Sonner](https://sonner.emilkowal.ski/) for notifications
- [@elhamdev/tracejs](https://www.npmjs.com/package/@elhamdev/tracejs) for debugging

---

## Getting Started

### 1. Install dependencies

```sh
pnpm install
# or
npm install
# or
yarn install
```

### 2. Start the development server

```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port Vite chooses).

---

## Project Structure

```text
src/
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  lib/             # Utilities and helpers
  styles/          # Global and Tailwind CSS
  App.tsx          # Main app component
  main.tsx         # Entry point
public/            # Static assets
```

- Aliases like `@/components` are set up for cleaner imports.

---

## Scripts

- `dev` – Start Vite dev server
- `build` – Type-check and build for production
- `preview` – Preview the production build
- `lint` – Run ESLint on the codebase

---

## Linting & Formatting

- ESLint is configured for TypeScript, React, and hooks.
- To lint the codebase:

  ```sh
  pnpm lint
  ```

- ESLint config is in `eslint.config.js`. Type-aware rules are enabled for stricter checks.

---

## Tailwind CSS

- Tailwind is integrated via `@tailwindcss/vite`.
- Global styles are in `src/styles/globals.css`.
- You can customize Tailwind via `tailwind.config.js` (if present).

---

## Customization

- **UI Components:** Uses [Radix UI](https://www.radix-ui.com/) and [Lucide Icons](https://lucide.dev/).
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) is included for global state.
- **Data Fetching:** [SWR](https://swr.vercel.app/) is included for remote data.

---

## TypeScript

- Strict mode is enabled.
- Project references are set up for scalable builds.
- Aliases are configured in `tsconfig.json` and `vite.config.ts`.

---

## Useful Links

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation)
- [Radix UI Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)

---

## License

This project is licensed under the MIT License.
