import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const PublicRoute = () => {
  const { user } = useAuthStore();

  if (user !== null) {
    return <Navigate to={'/chat'} />;
  }

  return <Outlet />;
};
