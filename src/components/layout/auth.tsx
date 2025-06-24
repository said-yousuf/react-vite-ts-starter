import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

export function AuthLayout() {
  const { token } = useAuthStore();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Outlet />
    </div>
  );
}
