import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const ProtectedRoute = () => {
  const { user } = useAuthStore();

  if (user === null) {
    console.log('user null inside protected', user);
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};