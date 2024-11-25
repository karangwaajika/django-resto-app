import React, { useState } from "react";
import { addComma } from "../../utils/addComma.mjs";
import { convertToDateTime } from "../../utils/dateFormat.mjs";
import PopUpMessage from "./PopUpMessage";

function EditOrderForm({
  beverages,
  teas,
  meals,
  overallTotal,
  componentUsedIn,
  ...props
}) {
  const [message, setMessage] = useState("");
  const [isPopUpMessage, setIsPopUpMessage] = useState(false);
  const handlePopUpMessage = (buttonType, actionType) => {
    if (buttonType == "delete") {
      setMessage("Delete the whole beverage");
      if (actionType == "onMouseEnter") {
        setIsPopUpMessage(true);
      } else {
        setIsPopUpMessage(false);
      }
    } else {
      setMessage("Decreament beverage Qty");
      if (actionType == "onMouseEnter") {
        setIsPopUpMessage(true);
      } else {
        setIsPopUpMessage(false);
      }
    }
  };
  const editBeverage = (beverageId, sold_qty, btnClicked) => {
    setIsPopUpMessage(false)
    props.setData((oldData) => {
      let newBeverages = [];
      if (btnClicked == "delete") {
        // todo
      } else {
        if (sold_qty == 1) {
          //delete beverage order
          newBeverages = oldData.order_beverages.filter(
            (item) => item.id !== beverageId
          );
        } else {
          // decreament by 1
          newBeverages = oldData.order_beverages.map((item) => {
            if (item.id == beverageId) {
              item.sold_qty--;
              return item;
            } else {
              return item;
            }
          });
        }
      }

      return { ...oldData, order_beverages: newBeverages };
    });
  };
  const editTea = () => {
    // todo
  };
  const editMeal = () => {
    // todo
  };
  return (
    <aside className="card order-info" style={{ flex: 1 }}>
      <div className="card-header">
        <div style={{ fontFamily: "cursive" }}>
          {" "}
          {componentUsedIn == "reorder"
            ? "Earlier Records"
            : "Order Records List"}
        </div>
      </div>

      <div
        className="bill-details"
        style={{ fontFamily: "century gothic", position: "relative" }}
      >
        {isPopUpMessage && <PopUpMessage message={message} />}
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
              <ul className="item-items edit-bill-ul">
                {beverages.map((item, i) => {
                  return (
                    <li key={i} className="td-row" style={{ gap: "20px" }}>
                      <div>{convertToDateTime(item.sold_date)}</div>
                      <div style={{ flexGrow: 1 }}>
                        {item.beverage.name}({item.sold_qty} x {item.price}) ={" "}
                        {addComma(item.sold_qty * item.price)} frw
                      </div>
                      <div
                        className="decreament-btn"
                        onMouseEnter={() =>
                          handlePopUpMessage("decreament", "onMouseEnter")
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage("decreament", "onMouseLeave")
                        }
                      >
                        {" "}
                        <i
                          className="fa fa-minus"
                          onClick={() =>
                            editBeverage(item.id, item.sold_qty, "decreament")
                          }
                        ></i>
                      </div>
                      <div
                        className="delete-order-btn text-danger"
                        onMouseEnter={() =>
                          handlePopUpMessage("delete", "onMouseEnter")
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage("delete", "onMouseLeave")
                        }
                      >
                        {" "}
                        <i
                          className="fa fa-times"
                          onClick={() =>
                            editBeverage(item.id, item.sold_qty, "delete")
                          }
                        ></i>
                      </div>
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
              <ul className="item-items edit-bill-ul">
                {meals.map((item, i) => {
                  return (
                    <li key={i} className="td-row" style={{ gap: "20px" }}>
                      <div>{convertToDateTime(item.sold_date)}</div>
                      <div style={{ flexGrow: 1 }}>
                        {item.meal.name}({item.plate_nbr} x {item.price}) ={" "}
                        {addComma(item.total_meal)} frw
                      </div>
                      <div className="decreament-btn">
                        {" "}
                        <i
                          className="fa fa-minus"
                          onClick={() =>
                            editMeal(item.id, item.plate_nbr, "decreament")
                          }
                        ></i>
                      </div>
                      <div className="delete-order-btn text-danger">
                        {" "}
                        <i
                          className="fa fa-times"
                          onClick={() =>
                            editMeal(item.id, item.plate_nbr, "delete")
                          }
                        ></i>
                      </div>
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
              <ul className="item-items edit-bill-ul">
                {teas.map((item, i) => {
                  return (
                    <li key={i} className="td-row" style={{ gap: "20px" }}>
                      <div>{convertToDateTime(item.sold_date)}</div>
                      <div style={{ flexGrow: 1 }}>
                        {item.tea.name}({item.qty} x {item.price}) ={" "}
                        {addComma(item.total_tea)} frw
                      </div>
                      <div className="decreament-btn">
                        {" "}
                        <i
                          className="fa fa-minus"
                          onClick={() =>
                            editTea(item.id, item.qty, "decreament")
                          }
                        ></i>
                      </div>
                      <div className="delete-order-btn text-danger">
                        {" "}
                        <i
                          className="fa fa-times"
                          onClick={() => editTea(item.id, item.qty, "delete")}
                        ></i>
                      </div>
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

export default EditOrderForm;
