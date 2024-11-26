import React, { useState } from "react";
import { addComma } from "../../utils/addComma.mjs";
import { convertToDateTime } from "../../utils/dateFormat.mjs";
import PopUpMessage from "./PopUpMessage";
import ConfirmModal from "./ConfirmModal";
import useEditOrder from "../../hooks/useEditOrder";
import loadingImg from "/images/spin.gif";
import FlashMessage from "../ui/FlashMessage";

function EditOrderForm({
  beverages,
  teas,
  meals,
  overallTotal,
  componentUsedIn,
  ...props
}) {
  // total cost of a bill
  let sumBeverage = 0;
  let sumMeal = 0;
  let sumTea = 0;
  if (beverages.length > 0) {
    for (let beverage of beverages) {
      sumBeverage += beverage.sold_qty * beverage.price;
    }
  }
  if (meals.length > 0) {
    for (let meal of meals) {
      sumMeal += meal.plate_nbr * meal.price;
    }
  }
  if (teas.length > 0) {
    for (let tea of teas) {
      sumTea += tea.qty * tea.price;
    }
  }
  let total = sumBeverage + sumMeal + sumTea;

  // handle pop-up message
  const [message, setMessage] = useState("");
  const [isPopUpMessage, setIsPopUpMessage] = useState(false);
  const handlePopUpMessage = (actionType, message) => {
    setMessage(message);
    if (actionType == "onMouseEnter") {
      setIsPopUpMessage(true);
    } else {
      setIsPopUpMessage(false);
    }
  };

  // handle confirm modal
  const [animation, setAnimation] = useState("animated fadeIn");
  const [isConfirmModalOpen, setConfirmModal] = useState(false);
  //handle the open and close of a modal
  const handleModal = () => {
    setConfirmModal((oldModalState) => !oldModalState);
  };
  const [itemData, setItemData] = useState({
    itemId: 0,
    itemName: "",
    itemQty: 0,
    itemPrice: 0,
    itemTotal: 0,
    itemSoldDate: "",
    itemType: "",
    rawData: {},
    action: "",
  });
  // handle the retrieving of data
  const handleConfirmModal = (itemType, itemInfo, action = "") => {
    if (itemType == "beverage") {
      const beverageData = {
        itemId: itemInfo.id,
        itemName: itemInfo.beverage.name,
        itemQty: itemInfo.sold_qty,
        itemPrice: itemInfo.price,
        itemTotal: itemInfo.price * itemInfo.sold_qty,
        itemSoldDate: convertToDateTime(itemInfo.sold_date),
        rawData: itemInfo,
        itemType: itemType,
        action: action,
      };

      setItemData(beverageData);
      setConfirmModal(true);
    }
    if (itemType == "tea") {
      const teaData = {
        itemId: itemInfo.id,
        itemName: itemInfo.tea.name,
        itemQty: itemInfo.qty,
        itemPrice: itemInfo.price,
        itemTotal: itemInfo.price * itemInfo.qty,
        itemSoldDate: convertToDateTime(itemInfo.sold_date),
        rawData: itemInfo,
        itemType: itemType,
        action: action,
      };
      setItemData(teaData);
      setConfirmModal(true);
    }
    if (itemType == "meal") {
      const mealData = {
        itemId: itemInfo.id,
        itemName: itemInfo.meal.name,
        itemQty: itemInfo.plate_nbr,
        itemPrice: itemInfo.price,
        itemTotal: itemInfo.price * itemInfo.plate_nbr,
        itemSoldDate: convertToDateTime(itemInfo.sold_date),
        rawData: itemInfo,
        itemType: itemType,
        action: action,
      };
      setItemData(mealData);
      setConfirmModal(true);
    }
  };

  const editBeverage = (beverageData, btnClicked) => {
    setIsPopUpMessage(false);
    if (btnClicked == "delete") {
      handleConfirmModal("beverage", beverageData, "delete");
    } else {
      if (beverageData.sold_qty == 1) {
        //delete beverage order
        handleConfirmModal("beverage", beverageData, "delete");
      } else {
        props.setData((oldData) => {
          let newBeverages = [];
          // decreament by 1
          newBeverages = oldData.order_beverages.map((item) => {
            if (item.id == beverageData.id) {
              item.sold_qty--;
              return item;
            } else {
              return item;
            }
          });

          return { ...oldData, order_beverages: newBeverages };
        });
      }
    }
  };
  const editTea = (teaData, btnClicked) => {
    setIsPopUpMessage(false);
    if (btnClicked == "delete") {
      handleConfirmModal("tea", teaData, "delete");
    } else {
      if (teaData.qty == 1) {
        handleConfirmModal("tea", teaData, "delete");
      } else {
        props.setData((oldData) => {
          let newTeas = [];
          // decreament by 1
          newTeas = oldData.order_teas.map((item) => {
            if (item.id == teaData.id) {
              item.qty--;
              return item;
            } else {
              return item;
            }
          });

          return { ...oldData, order_teas: newTeas };
        });
      }
    }
  };
  const editMeal = (mealData, btnClicked) => {
    setIsPopUpMessage(false);
    if (btnClicked == "delete") {
      handleConfirmModal("meal", mealData, "delete");
    } else {
      if (mealData.plate_nbr == 1) {
        handleConfirmModal("meal", mealData, "delete");
      } else {
        props.setData((oldData) => {
          let newMeals = [];
          // decreament by 1
          newMeals = oldData.order_meals.map((item) => {
            if (item.id == mealData.id) {
              item.plate_nbr--;
              return item;
            } else {
              return item;
            }
          });

          return { ...oldData, order_meals: newMeals };
        });
      }
    }
  };
  const {
    editOrder,
    message: responseMessage,
    clearMessage,
    isLoading,
  } = useEditOrder(props.setRefresh, props.data.id);
  return (
    <aside className="card order-info" style={{ flex: 1 }}>
      <div className="card-header">
        <div style={{ fontFamily: "cursive" }}>
          {" "}
          {componentUsedIn == "reorder"
            ? "Earlier Records"
            : "Order Records List"}
          {" of Client: " + props.data.customer_name + props.data.id}
        </div>
        {responseMessage && (
          <FlashMessage
            message={responseMessage.message}
            isSuccess={responseMessage.success}
            clearMessage={clearMessage}
          />
        )}
        {isLoading && (
          <div>
            <img src={loadingImg} width={25} height={25} />
          </div>
        )}
      </div>

      <div
        className="bill-details"
        style={{ fontFamily: "century gothic", position: "relative" }}
      >
        {isPopUpMessage && <PopUpMessage message={message} />}
        {isConfirmModalOpen && (
          <ConfirmModal
            itemData={itemData}
            closeModal={handleModal}
            animate={animation}
            editOrder={() =>
              editOrder(itemData.rawData, itemData.itemType, itemData.action)
            }
          />
        )}
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
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Decreament beverage Qty"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Decreament beverage Qty"
                          )
                        }
                        onClick={() => editBeverage(item, "decreament")}
                      >
                        {" "}
                        <i className="fa fa-minus"></i>
                      </div>
                      <div
                        className="delete-order-btn text-danger"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Delete the whole beverage"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Delete the whole beverage"
                          )
                        }
                        onClick={() => editBeverage(item, "delete")}
                      >
                        {" "}
                        <i className="fa fa-times"></i>
                      </div>
                      <div
                        className="edit-order-btn text-success"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Save beverage changes"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Save beverage changes"
                          )
                        }
                        onClick={() => editOrder(item, "beverage","decreament")}
                      >
                        {" "}
                        <i className="fa fa-check"></i>
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
                      <div
                        className="decreament-btn"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Decreament meal Qty"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Decreament meal Qty"
                          )
                        }
                        onClick={() => editMeal(item, "decreament")}
                      >
                        {" "}
                        <i className="fa fa-minus"></i>
                      </div>
                      <div
                        className="delete-order-btn text-danger"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Delete the whole meal"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Delete the whole meal"
                          )
                        }
                        onClick={() => editMeal(item, "delete")}
                      >
                        {" "}
                        <i className="fa fa-times"></i>
                      </div>
                      <div
                        className="edit-order-btn text-success"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Save meal changes"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Save meal changes"
                          )
                        }
                        onClick={() => editOrder(item, "meal")}
                      >
                        {" "}
                        <i className="fa fa-check"></i>
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
                      <div
                        className="decreament-btn"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Decreament tea Qty"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Decreament tea Qty"
                          )
                        }
                        onClick={() => editTea(item, "decreament")}
                      >
                        {" "}
                        <i className="fa fa-minus"></i>
                      </div>
                      <div
                        className="delete-order-btn text-danger"
                        onMouseEnter={() =>
                          handlePopUpMessage(
                            "onMouseEnter",
                            "Delete the whole tea"
                          )
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage(
                            "onMouseLeave",
                            "Delete the whole tea"
                          )
                        }
                        onClick={() => editTea(item, "delete")}
                      >
                        {" "}
                        <i className="fa fa-times"></i>
                      </div>
                      <div
                        className="edit-order-btn text-success"
                        onMouseEnter={() =>
                          handlePopUpMessage("onMouseEnter", "Save tea changes")
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage("onMouseLeave", "Save tea changes")
                        }
                        onClick={() => editOrder(item, "tea")}
                      >
                        {" "}
                        <i className="fa fa-check"></i>
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
              {addComma(total ? total : 0)} Rwf
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
