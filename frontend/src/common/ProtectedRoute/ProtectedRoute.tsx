import { Navigate, Outlet } from "react-router-dom";
import useCurrentUser from "hooks/useCurrentUser";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}