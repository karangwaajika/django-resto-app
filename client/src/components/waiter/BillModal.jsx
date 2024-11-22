import React, { useRef } from "react";
import { addComma } from "../../utils/addComma.mjs";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "../ui/Button";

function BillModal({
  beverages,
  teas,
  meals,
  billTotal,
  closeModal,
  animate,
  orderIndex,
}) {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className={`modal ${animate}`}>
      <div></div>
      <div className="modal-content" style={{ width: "300px" }}>
        <div className="modal-header">
          <h2 style={{ fontFamily: "cursive" }}>L&#128514;L Bar-Resto Bill</h2>
          <div className="modal-close-button">
            <i
              className="fa fa-rectangle-xmark"
              onClick={() => {
                return closeModal(
                  orderIndex,
                  beverages,
                  meals,
                  teas,
                  billTotal
                );
              }}
            ></i>
            <i
              className="fa fa-print"
              onClick={reactToPrintFn}
            ></i>
          </div>
        </div>
        <div className="modal-body" ref={contentRef}>
          <aside className="card order-info">
            <div className="card-header">
              <div style={{ fontFamily: "cursive" }}>Bill Records</div>
            </div>
            <div
              className="card-header"
              style={{ fontSize: "12px", textAlign: "left" }}
            >
              <ul style={{ listStyle: "none" }}>
                <li>Address: kg-st-007</li>
                <li>Mobile: 0784625102</li>
                <li>
                  Social Media{" "}
                  <i className="fa-brands fa-twitter">
                    {" "}
                    || <i className="fa-brands fa-snapchat"></i> ||{" "}
                    <i className="fa-brands fa-instagram"></i> ||{" "}
                    <i className="fa-brands fa-facebook"></i>
                  </i>
                </li>
                <li>
                  Website:{" "}
                  <Link
                    to=""
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    www.L&#128514;L Resto-Bar.com
                  </Link>
                </li>
              </ul>
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
                    style={{
                      borderLeft: "1px solid #7c6c3b",
                      marginLeft: "5px",
                    }}
                  >
                    <ul className="item-items">
                      {beverages.map((item, i) => {
                        return (
                          <li key={i}>
                            {item.beverage.name}({item.sold_qty} x {item.price})
                            = {addComma(item.total_beverage)} frw
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
                    style={{
                      borderLeft: "1px solid #7c6c3b",
                      marginLeft: "5px",
                    }}
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
                    style={{
                      borderLeft: "1px solid #7c6c3b",
                      marginLeft: "5px",
                    }}
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
              {billTotal ? (
                <div style={{ textAlign: "center" }}>
                  Total:{" "}
                  <i className="span span-success">
                    {addComma(billTotal ? billTotal : 0)} Rwf
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
        </div>
      </div>
    </div>
  );
}

export default BillModal;
