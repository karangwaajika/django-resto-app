import useProtectPage from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectPage() {
  const { isAuthenticated, userInfo } = useProtectPage();
  console.log(userInfo.is_superuser)
  if (Object.keys(isAuthenticated).length > 0) {
    if (!isAuthenticated.status || userInfo.is_superuser) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }
}
