import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSideBar from "../components/DashboardSideBar";
import "../assets/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="left-side">
        <DashboardSideBar />
      </div>
      <div className="right-side">
        <DashboardNavbar />
        <div className="main-content">
          {/* todo: display content by page  */}
        </div>
      </div>
    </div>
  );
}
