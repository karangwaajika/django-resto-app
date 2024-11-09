import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import { userContext } from "../pages/Dashboard";
import { useContext } from "react";
export default function DashboardNavbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdrownAnimation, setDropdownAnimation] = useState(false);

  const closeDropdownOnMouseLeave = () => {
    setOpenDropdown(false);
  };
  const user = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_REACT_APP_TOKEN);
    navigate("/")
  };
  return (
    <nav className="right-nav">
      <p>Restaurant Managing Dashboard</p>
      <ul className="right-ul"></ul>
      <div className="profile">
        <div className="name">
          <h5>{user.email}</h5>
        </div>
        <div className="caret-down" onClick={() => setOpenDropdown(true)}>
          <i className="fa fa-caret-down"></i>
        </div>
        {openDropdown && (
          <Dropdown
            closeDropdown={closeDropdownOnMouseLeave}
            animation={dropdrownAnimation}
            logout={logout}
          />
        )}
      </div>
    </nav>
  );
}
