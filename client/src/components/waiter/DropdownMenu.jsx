import React from "react";
import { Link } from "react-router-dom";

function DropdownMenu({ closeModal, animate }) {
  return (
    <div
      className={`card dropdown-menu ${animate}`}
      onMouseLeave={() => closeModal("menu")}
      onClick={() => closeModal("menu")}
    >
      <ul>
        <li>
          <Link to="service/beverages">Beverages</Link>
        </li>
        <li>
          <Link to="service/meals">Meals</Link>
        </li>
        <li>
          <Link to="service/smoothies">Smoothies</Link>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
