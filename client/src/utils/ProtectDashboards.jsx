import useProtectPage from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectDashboards() {
  const { isAuthenticated, userInfo } = useProtectPage();
  if (Object.keys(isAuthenticated).length > 0) {
    if (!isAuthenticated.status || !userInfo.is_superuser) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }
}
