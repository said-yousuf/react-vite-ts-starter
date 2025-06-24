import { Outlet } from 'react-router-dom';

/**
 * MainLayout component serves as the primary layout wrapper for the application.
 * It renders a full viewport-height container and displays nested routes via the <Outlet /> component.
 *
 * @remarks
 * - Authentication and profile fetching logic can be enabled by uncommenting the relevant code.
 * - Intended to be used as a layout route in React Router.
 *
 * @returns {JSX.Element} The rendered layout with nested route content.
 */
export function MainLayout() {
  // const { token } = useAuthStore();
  //   useEffect(() => {
  //   if (!token) {
  //     navigate('/login');
  //     return;
  //   }

  //   // Fetch profile when there's no admin data
  //   if (token && !admin) {
  //     fetchProfile();
  //   }

  // }, [token, admin, navigate]);

  return (
    <div className="h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
