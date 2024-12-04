import { NavLink } from "react-router-dom";
import { userContext } from "../pages/Dashboard";
import { useContext } from "react";
export default function DashboardSideBar({...props}) {

  const user = useContext(userContext);
  return (
    <div className="left-nav">
      <article>
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
        <figure>
          <img
            src="/images/userm2.png"
            alt="profile-pic"
            width={200}
            height={200}
          />
          <figcaption style={{ color: "white" }}>
            {user.first_name && user.first_name}{" "}
            {user.last_name && user.last_name}
          </figcaption>
        </figure>
        <p>
          {user.first_name && user.first_name} {user.email && user.email}
        </p>
      </article>

      <nav>
        <ul className="left-ul">
          <li>
            <NavLink to="/dashboard/home" className="link">
              <i className="fa fa-home "></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-tea" className="link">
              <i className="fa fa-coffee "></i>
              Add Tea/Coffee
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-teas" className="link">
              <i className="fa fa-mug-hot "></i>
              View Tea/Coffees
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-meal" className="link">
              <i className="fa fa-pizza-slice "></i>
              Add Meal
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-meals" className="link">
              <i className="fa-solid fa-burger"></i>
              View Meal
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-beverage" className="link">
              <i className="fa fa-wine-glass "></i>
              Add Beverage
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-beverages" className="link">
              <i className="fa fa-champagne-glasses "></i>
              View Beverages
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-waiter" className="link">
              <i className="fa fa-user-plus "></i>
              Add Waiter
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-waiters" className="link">
              <i className="fa fa-users "></i>
              View Waiters
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLink to="" className="link">
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/general-report" className="link">
              <i className="fa fa-folder "></i>
              General Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/waiters-orders" className="link">
              <i className="fa fa-folder "></i>
              Waiter Report
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/unpaid-reports" className="link">
              <i className="fa fa-folder "></i>
              Debt Report
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
