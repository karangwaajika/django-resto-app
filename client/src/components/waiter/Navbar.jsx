import { NavLink, Link } from "react-router-dom";
import { formatToDateString } from "../../utils/dateFormat.mjs";

export default function Navbar() {
  const date = Date.now();
  return (
    <nav className="navbar-home service">
      <div className="left-info">
        <ul className="links">
          <li>
            <NavLink to="/service/home">
              Home
            </NavLink>
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
        <div className="name">ajika@yahoo.fr</div>

        <Link className="caret-down">
          <i className="fa fa-caret-down"></i>
        </Link>
      </div>
    </nav>
  );
}
