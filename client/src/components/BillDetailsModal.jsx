import React, { useRef } from "react";
import { addComma } from "../utils/addComma.mjs";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { convertToDateTime } from "../utils/dateFormat.mjs";

function BillDetailsModal({
  beverages,
  teas,
  meals,
  billTotal,
  closeModal,
  animate,
  orderIndex,
  order,
}) {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  let remainder = order.amount_to_pay;
  if (order.overall_total == order.momo + order.cash) {
    remainder = 0;
  }
  return (
    <div className={`modal ${animate}`}>
      <div className="modal-content" style={{ width: "300px" }}>
        <div className="modal-header">
          <h2 style={{ fontFamily: "cursive" }}>L&#128514;L Bar-Resto Bill</h2>
          <div className="modal-close-button bill-print-section">
            <i
              className="fa fa-rectangle-xmark"
              onClick={() => {
                return closeModal(
                  orderIndex,
                  beverages,
                  meals,
                  teas,
                  billTotal,
                  order
                );
              }}
            ></i>
            <i className="fa fa-print" onClick={reactToPrintFn}></i>
          </div>
        </div>
        <div className="modal-body" ref={contentRef}>
          <aside className="card orderr-info">
            <div className="card-header">
              <div style={{ fontFamily: "cursive" }}>
                {" "}
                Client : {order.customer_name}
              </div>
            </div>
            <div
              className="card-header bill-header"
              style={{ fontSize: "12px", textAlign: "left" }}
            >
              <div className="card">
                <div className="card-body text-dark">
                  <ul style={{ listStyle: "none" }}>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      Receipt Number :{" "}
                      {order.id ? (
                        <strong> # {order.id}</strong>
                      ) : (
                        <div
                          className="loading-page"
                          style={{ width: "50%" }}
                        ></div>
                      )}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      Amount Consumed :{" "}
                      {order.overall_total ? (
                        <strong> {addComma(order.overall_total)} frw</strong>
                      ) : (
                        <div
                          className="loading-page"
                          style={{ width: "50%" }}
                        ></div>
                      )}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      Amount Paid :{" "}
                      {order.amount_paid >= 0 ? (
                        <strong>{addComma(order.amount_paid)} frw</strong>
                      ) : (
                        <div
                          className="loading-page"
                          style={{ width: "50%" }}
                        ></div>
                      )}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      Remainder :{" "}
                      {order.amount_to_pay ? (
                        <strong className="span span-danger">
                          {" "}
                          {addComma(remainder)} Rwf
                        </strong>
                      ) : (
                        <div
                          className="loading-page"
                          style={{ width: "50%" }}
                        ></div>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="card-footer" style={{fontSize:"11px", borderTop: "1px solid #80808080"}}>
                  <ul>
                    
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      Created :{convertToDateTime(order.created_at)}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      Updated :{convertToDateTime(order.updated_at)}
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ------------Comment-------------
                    </li>
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {order.comment ? order.comment : "No comment"}
                    </li>
                  </ul>
                </div>
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
                    style={{
                      borderLeft: "1px solid #7c6c3b",
                      marginLeft: "5px",
                    }}
                  >
                    <ul className="item-items">
                      {beverages.map((item, i) => {
                        return (
                          <li key={i}>
                            {item.beverage.name}({item.total_qty} x{" "}
                            {item.sold_price}) = {addComma(item.total_amount)}{" "}
                            frw
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
                            {item.meal.name}({item.total_qty} x{" "}
                            {item.meal.price}) = {addComma(item.total_amount)}{" "}
                            frw
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
                            {item.tea.name}({item.total_qty} x {item.tea.price})
                            = {addComma(item.total_amount)} frw
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

export default BillDetailsModal;
