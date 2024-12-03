import { NavLink, Link, useNavigate } from "react-router-dom";
import { formatToDateString } from "../../utils/dateFormat.mjs";
import { useContext, useState } from "react";
import { userContext } from "../../pages/waiter/Service";
import DropdownProfile from "./DropdownProfile";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const [isBarClicked, setIsBarClicked] = useState(false);
  const date = Date.now();
  const user = useContext(userContext);
  const navigate = useNavigate();

  const [animation, setAnimation] = useState("animated fadeIn");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const handleModal = (typeOfModal) => {
    if (typeOfModal == "profile") {
      setAnimation(openProfileModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenProfileModal((oldModalState) => !oldModalState);
      }, 1000);
    }
    if (typeOfModal == "menu") {
      setAnimation(openMenuModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenMenuModal((oldModalState) => !oldModalState);
      }, 1000);
    }
  };

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_REACT_APP_TOKEN);
    navigate("/");
  };

  return (
    <nav className="service">
      <div className="toggle-btn">
        <i
          id="bar"
          onClick={() => setIsBarClicked((oldState) => !oldState)}
          className={
            isBarClicked ? "icon-click fa fa-times" : "icon-click fa fa-bars"
          }
        ></i>
      </div>
      <ul className={`links ${isBarClicked && "active"}`}>
        <li>
          <NavLink to="/service/home">Home</NavLink>
        </li>
        <li className="menu">
          <Link to="#" onClick={() => handleModal("menu")}>
            Menu <i className="fa fa-caret-down"></i>
          </Link>
          {openMenuModal && (
            <DropdownMenu closeModal={handleModal} animate={animation} />
          )}
        </li>
        <li>
          <NavLink to="/service/orders">Bill</NavLink>
        </li>
        <li>
          <NavLink to="/service/service">Record Order</NavLink>
        </li>
        <li>
          <NavLink to="/service/my-services">My services</NavLink>
        </li>
      </ul>
      <div className="navbar-date">{formatToDateString(date)}</div>
      <div className="right-info">
        <div className="name nowrap">
          {user.first_name && user.first_name}{" "}
          {user.last_name && user.last_name}
        </div>

        <Link
          to="#"
          className="caret-down"
          onClick={() => handleModal("profile")}
        >
          <i className="fa fa-caret-down"></i>
        </Link>
      </div>
      {openProfileModal && (
        <DropdownProfile
          closeModal={handleModal}
          animate={animation}
          user={user}
          logout={logout}
        />
      )}
    </nav>
  );
}
