import { NavLink, Link, useNavigate } from "react-router-dom";
import { formatToDateString } from "../../utils/dateFormat.mjs";
import { useContext, useState } from "react";
import { userContext } from "../../pages/waiter/Home";
import DropdownProfile from "./DropdownProfile";

export default function Navbar() {
  const date = Date.now();
  const user = useContext(userContext);
  const navigate = useNavigate()

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
    <nav className="navbar-home service">
      <div className="left-info">
        <ul className="links">
          <li>
            <NavLink to="/service/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/service/menu">Menu</NavLink>
          </li>
          <li>
            <NavLink to="/service/bill">Bill</NavLink>
          </li>
          <li>
            <NavLink to="/service/service">Service</NavLink>
          </li>
          <li>
            <NavLink to="/service/reorder">Re-order</NavLink>
          </li>
        </ul>
      </div>
      <div className="date">{formatToDateString(date)}</div>
      <div className="right-info">
        <div className="name">{user.first_name + " " + user.last_name}</div>

        <Link className="caret-down" onClick={() => handleModal("profile")}>
          <i className="fa fa-caret-down"></i>
        </Link>
      </div>
      {openProfileModal && (
        <DropdownProfile closeModal={handleModal} animate={animation} user={user} logout={logout}/>
      )}
    </nav>
  );
}
