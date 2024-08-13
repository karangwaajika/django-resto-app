import { NavLink } from "react-router-dom";
import { userContext } from "../pages/Dashboard";
import { useContext } from "react";
export default function DashboardSideBar() {
  const user = useContext(userContext);
  return (
    <div className="left-nav">
      <article>
        <figure>
          <img
            src="/images/userm2.png"
            alt="profile-pic"
            width={200}
            height={200}
          />
          <figcaption style={{ color: "white" }}>
            {user.first_name + " " + user.last_name}
          </figcaption>
        </figure>
        <p>{user.first_name + " " + user.email}</p>
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
              <i className="fa fa-home "></i>
              Add Tea/Coffee
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-teas" className="link">
              <i className="fa fa-home "></i>
              View Tea/Coffees
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-meal" className="link">
              <i className="fa fa-home "></i>
              Add Meal
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-meals" className="link">
              <i className="fa fa-home "></i>
              View Meal
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-beverage" className="link">
              <i className="fa fa-home "></i>
              Add Beverage
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/purchase-beverage" className="link">
              <i className="fa fa-home "></i>
              Purchase Beverage
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-beverages" className="link">
              <i className="fa fa-home "></i>
              View Beverages
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-waiter" className="link">
              <i className="fa fa-home "></i>
              Add Waiter
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/view-waiters" className="link">
              <i className="fa fa-home "></i>
              View Waiters
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
