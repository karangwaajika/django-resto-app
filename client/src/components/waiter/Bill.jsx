import React from "react";
import { addComma } from "../../utils/addComma.mjs";

function Bill({
  beverages,
  removeBeverage,
  teas,
  removeTea,
  meals,
  removeMeal,
  componentUsedIn,
}) {
  let sumBeverage = 0;
  let sumMeal = 0;
  let sumTea = 0;
  if (beverages.length > 0) {
    for (let beverage of beverages) {
      sumBeverage += beverage.beverageQty * beverage.beveragePrice;
    }
  }
  if (meals.length > 0) {
    for (let meal of meals) {
      sumMeal += meal.mealQty * meal.mealPrice;
    }
  }
  if (teas.length > 0) {
    for (let tea of teas) {
      sumTea += tea.teaQty * tea.teaPrice;
    }
  }
  let total = sumBeverage + sumMeal + sumTea;
  return (
    <aside className="card order-info">
      <div className="card-header">
        <div style={{ fontFamily: "cursive" }}>
          {componentUsedIn == "reorder" ? "New Records" : "Order Records"}
        </div>
      </div>
      <div className="bill-details">
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
            {beverages.length > 0 ? (
              <ul className="item-items">
                {beverages.map((item, i) => {
                  return (
                    <li key={i}>
                      {item.beverageName}({item.beverageQty} x{" "}
                      {item.beveragePrice}) ={" "}
                      {addComma(item.beverageQty * item.beveragePrice)} frw
                      <i
                        className="fa fa-times text-danger"
                        style={{
                          fontSize: "13px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeBeverage(i)}
                      ></i>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <i style={{ textAlign: "left", fontSize: "13px", color: "red" }}>
                No item
              </i>
            )}
          </div>
        </div>
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
            {meals.length > 0 ? (
              <ul className="item-items">
                {meals.map((item, i) => {
                  return (
                    <li key={i}>
                      {item.mealName}({item.mealQty} x {item.mealPrice}) ={" "}
                      {addComma(item.mealQty * item.mealPrice)} frw
                      <i
                        className="fa fa-times text-danger"
                        style={{
                          fontSize: "13px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeMeal(i)}
                      ></i>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <i
                style={{ textAlign: "center", fontSize: "13px", color: "red" }}
              >
                No item
              </i>
            )}
          </div>
        </div>
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
            {teas.length > 0 ? (
              <ul className="item-items">
                {teas.map((item, i) => {
                  return (
                    <li key={i}>
                      {item.teaName}({item.teaQty} x {item.teaPrice}) ={" "}
                      {addComma(item.teaQty * item.teaPrice)} frw
                      <i
                        className="fa fa-times text-danger"
                        style={{
                          fontSize: "13px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeTea(i)}
                      ></i>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <i
                style={{ textAlign: "center", fontSize: "13px", color: "red" }}
              >
                No item
              </i>
            )}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          Total: <i className="span span-success">{addComma(total)} Rwf</i>
        </div>
      </div>
    </aside>
  );
}

export default Bill;
