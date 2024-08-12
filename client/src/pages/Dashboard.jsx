import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSideBar from "../components/DashboardSideBar";
import "../assets/Dashboard.css";
import { Outlet } from "react-router-dom";
import useProtectPage from "../hooks/useProtectPage";
import { createContext } from "react";

export const userContext = createContext();
export default function Dashboard() {
  const { userInfo } = useProtectPage();
  return (
    <div className="dashboard-container">
      <userContext.Provider value={Object.keys(userInfo).length && userInfo}>
        <div className="left-side">
          <DashboardSideBar />
        </div>
        <div className="right-side">
          <DashboardNavbar />
          <div className="main-content">
            <Outlet context={userInfo}/>
          </div>
        </div>
      </userContext.Provider>
    </div>
  );
}
