import useProtectPage from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectPage() {
  const { isAuthenticated } = useProtectPage();
  if (Object.keys(isAuthenticated).length > 0) {
    if (!isAuthenticated.status) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }
}
