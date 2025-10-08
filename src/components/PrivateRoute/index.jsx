import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function PrivateRoute({ roles = [] }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (roles.length > 0 && (!user.role || !roles.includes(user.role))) {
    console.warn("Usuário sem permissão:", user);
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
