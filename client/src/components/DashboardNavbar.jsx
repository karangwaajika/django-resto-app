import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { useState } from "react";
import { userContext } from "../pages/Dashboard";
import { useContext } from "react";
export default function DashboardNavbar({ ...props }) {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const [animation, setAnimation] = useState("animated fadeIn");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleModal = (typeOfModal) => {
    if (typeOfModal == "profile") {
      setAnimation(openProfileModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenProfileModal((oldModalState) => !oldModalState);
      }, 1000);
    }
  };

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_REACT_APP_TOKEN);
    navigate("/");
  };

  return (
    <nav className="right-nav">
      <div className="toggle-btn-dashboard">
        <i
          id="bar"
          onClick={() => props.setIsBarClicked((oldState) => !oldState)}
          className={
            props.isBarClicked
              ? "icon-click fa fa-times"
              : "icon-click fa fa-bars"
          }
        ></i>
      </div>
      <p className="navbar-dashboard-text">Restaurant Managing Dashboard</p>
      <ul className="right-ul"></ul>
      <div className="profile">
        <div className="name">
          <h5>{user.email && user.email}</h5>
        </div>
        <div className="caret-down" onClick={() => handleModal("profile")}>
          <i className="fa fa-caret-down"></i>
        </div>
        {openProfileModal && (
          <Dropdown
            closeModal={handleModal}
            animate={animation}
            user={user}
            logout={logout}
          />
        )}
      </div>
    </nav>
  );
}
