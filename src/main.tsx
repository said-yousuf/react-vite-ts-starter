import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './providers/theme-provider';
import { router } from './router';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    <Toaster expand={false} richColors />
  </ThemeProvider>
);
