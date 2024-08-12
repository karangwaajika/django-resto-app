import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import picture from '/images/cof.webp'
export default function DashboardNavbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdrownAnimation, setDropdownAnimation] = useState(false);

  const closeDropdownOnMouseLeave = () => {
    setOpenDropdown(false);
  };
  return (
    <nav className="right-nav">
      <p>Restaurant Managing Dashboard</p>
      <ul className="right-ul">
      </ul>
      <div className="profile">
        <div className="name">
          <h5>ajika@yahoo.fr</h5>
        </div>
        <div className="caret-down" onClick={() => setOpenDropdown(true)}>
          <i className="fa fa-caret-down"></i>
        </div>
        {openDropdown && (
          <Dropdown
            closeDropdown={closeDropdownOnMouseLeave}
            animation={dropdrownAnimation}
          />
        )}
      </div>
    </nav>
  );
}
