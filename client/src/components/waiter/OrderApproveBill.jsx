import React from "react";
import { addComma } from "../../utils/addComma.mjs";

function OrderApproveBill({
  beverages,
  teas,
  meals,
  overallTotal,
  componentUsedIn,
}) {
  return (
    <aside className="card order-info">
      <div className="card-header">
        <div style={{ fontFamily: "cursive" }}>
          {" "}
          {componentUsedIn == "reorder" ? "Earlier Records" : "Order Records"}
        </div>
      </div>

      <div className="bill-details">
        {beverages.length > 0 && (
          <div className="item-bill">
            <div className="item-header">
              <div className="item-icon">
                <i className="far fa-circle-dot"></i>
              </div>
              <div className="item-text" style={{ fontWeight: "bold" }}>
                Beverage
              </div>
            </div>
            <div
              className=""
              style={{ borderLeft: "1px solid #7c6c3b", marginLeft: "5px" }}
            >
              <ul className="item-items">
                {beverages.map((item, i) => {
                  return (
                    <li key={i}>
                      {item.beverage.name}({item.sold_qty} x {item.price}) ={" "}
                      {addComma(item.total_beverage)} frw
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {meals.length > 0 && (
          <div className="item-bill">
            <div className="item-header">
              <div className="item-icon">
                <i className="far fa-circle-dot"></i>
              </div>
              <div className="item-text" style={{ fontWeight: "bold" }}>
                Meal
              </div>
            </div>
            <div
              className=""
              style={{ borderLeft: "1px solid #7c6c3b", marginLeft: "5px" }}
            >
              <ul className="item-items">
                {meals.map((item, i) => {
                  return (
                    <li key={i}>
                      {item.meal.name}({item.plate_nbr} x {item.price}) ={" "}
                      {addComma(item.total_meal)} frw
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {teas.length > 0 && (
          <div className="item-bill">
            <div className="item-header">
              <div className="item-icon">
                <i className="far fa-circle-dot"></i>
              </div>
              <div className="item-text" style={{ fontWeight: "bold" }}>
                Smoothy
              </div>
            </div>
            <div
              className=""
              style={{ borderLeft: "1px solid #7c6c3b", marginLeft: "5px" }}
            >
              <ul className="item-items">
                {teas.map((item, i) => {
                  return (
                    <li key={i}>
                      {item.tea.name}({item.qty} x {item.price}) ={" "}
                      {addComma(item.total_tea)} frw
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {overallTotal ? (
          <div style={{ textAlign: "center" }}>
            Total:{" "}
            <i className="span span-success">
              {addComma(overallTotal ? overallTotal : 0)} Rwf
            </i>
          </div>
        ) : (
          <div
            className="loading-page"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            {" "}
            loading ...
          </div>
        )}
      </div>
    </aside>
  );
}

export default OrderApproveBill;
