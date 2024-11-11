import React from "react";
import teaImage from "/images/beer1.jpg";
import mealImage from "/images/food.jpg";
import beverageImage from "/images/drinks.webp";
import { Link, useNavigate } from "react-router-dom";

function MenuSection() {
  const navigate = useNavigate();
  return (
    <section className="menu-section">
      <div className="card">
        <div
          className="card-header"
          onClick={() => navigate("/service/beverages")}
        >
          <img src={teaImage} alt="profile" width={300} height={300} />
        </div>
        <div className="card-body">
          <i className="fa fa-share-alt"></i>
          <div
            className="footer-card"
            onClick={() => navigate("/service/beverages")}
          >
            <i>Beverage</i>
            <i className="fa fa-angle-double-right"></i>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" onClick={() => navigate("/service/meals")}>
          <img src={mealImage} alt="profile" width={300} height={300} />
        </div>
        <div className="card-body">
          <i className="fa fa-share-alt"></i>
          <div
            className="footer-card"
            onClick={() => navigate("/service/meals")}
          >
            <i>Meal</i>
            <i className="fa fa-angle-double-right"></i>
          </div>
        </div>
      </div>
      <div className="card">
        <div
          className="card-header"
          onClick={() => navigate("/service/smoothies")}
        >
          <img src={beverageImage} alt="profile" width={300} height={300} />
        </div>
        <div className="card-body">
          <i className="fa fa-share-alt"></i>
          <div
            className="footer-card"
            onClick={() => navigate("/service/smoothies")}
          >
            <i>Smoothies</i>
            <i className="fa fa-angle-double-right"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
