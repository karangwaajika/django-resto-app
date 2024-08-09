import { NavLink } from "react-router-dom";
export default function DashboardSideBar() {
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
          <figcaption>Ajika karangwa</figcaption>
        </figure>
        <p>ajika ajika@yahoo.fr</p>
      </article>

      <nav>
        <ul className="left-ul">
          <li>
            <NavLink to="/dashboard" className="link">
              <i className="fa fa-home "></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-tea" className="link">
              <i className="fa fa-home "></i>
              Add Hot Drink
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-teas" className="link">
              <i className="fa fa-home "></i>
              View Hot Drinks
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-meal" className="link">
              <i className="fa fa-home "></i>
              Add Meal
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-meals" className="link">
              <i className="fa fa-home "></i>
              View Meal
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-beverage" className="link">
              <i className="fa fa-home "></i>
              Add Beverage
            </NavLink>
          </li>
          <li>
            <NavLink to="/purchase-beverage" className="link">
              <i className="fa fa-home "></i>
              Purchase Beverage
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-beverages" className="link">
              <i className="fa fa-home "></i>
              View Beverages
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-waiter" className="link">
              <i className="fa fa-home "></i>
              Add Waiter
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-waiters" className="link">
              <i className="fa fa-home "></i>
              View Waiters
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
