import React, { useState } from "react";
import { addComma } from "../../utils/addComma.mjs";
import { convertToDateTime } from "../../utils/dateFormat.mjs";
import PopUpMessage from "./PopUpMessage";
import ConfirmModal from "./ConfirmModal";

function EditOrderForm({
  beverages,
  teas,
  meals,
  overallTotal,
  componentUsedIn,
  ...props
}) {
  // handle pop-up message
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

  // handle confirm modal
  const [animation, setAnimation] = useState("animated fadeIn");
  const [isConfirmModalOpen, setConfirmModal] = useState(false);
  //handle the open and close of a modal
  const handleModal = () => {
    setAnimation(isConfirmModalOpen ? "animated fadeOut" : "animated fadeIn");
    setTimeout(() => {
      setConfirmModal((oldModalState) => !oldModalState);
    }, 1000);
  };
  const [itemData, setItemData] = useState({
    itemId: 0,
    itemName: "",
    itemQty: 0,
    itemPrice: 0,
    itemTotal: 0,
    ItemSoldDate: "",
  });
  // handle the retrieving of data
  const handleConfirmModal = (itemType = null, itemInfo = 0) => {
    if (itemType == "beverage") {
      const beverageData = {
        itemId: itemInfo.id,
        itemName: itemInfo.beverage.name,
        itemQty: itemInfo.sold_qty,
        itemPrice: itemInfo.price,
        itemTotal: itemInfo.price * itemInfo.sold_qty,
        itemSoldDate: convertToDateTime(itemInfo.sold_date),
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
      };
      setItemData(mealData);
      setConfirmModal(true);
    }
  };

  const editBeverage = (beverageData, btnClicked) => {
    setIsPopUpMessage(false);
    if (btnClicked == "delete") {
      handleConfirmModal("beverage", beverageData);
      console.log("here");
    } else {
      if (beverageData.sold_qty == 1) {
        //delete beverage order
        // newBeverages = oldData.order_beverages.filter(
        //   (item) => item.id !== beverageData.id
        // );
        handleConfirmModal("beverage", beverageData);
        console.log("here");
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
      handleConfirmModal("tea", teaData);
      console.log("here");
    } else {
      if (teaData.qty == 1) {
        handleConfirmModal("tea", teaData);
        console.log("here");
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
      handleConfirmModal("meal", mealData);
      console.log("here");
    } else {
      if (mealData.plate_nbr == 1) {
        handleConfirmModal("meal", mealData);
        console.log("here");
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
        {isConfirmModalOpen && (
          <ConfirmModal
            itemData={itemData}
            closeModal={handleModal}
            animate={animation}
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
                          handlePopUpMessage("decreament", "onMouseEnter")
                        }
                        onMouseLeave={() =>
                          handlePopUpMessage("decreament", "onMouseLeave")
                        }
                      >
                        {" "}
                        <i
                          className="fa fa-minus"
                          onClick={() => editBeverage(item, "decreament")}
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
                          onClick={() => editBeverage(item, "delete")}
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
                          onClick={() => editMeal(item, "decreament")}
                        ></i>
                      </div>
                      <div className="delete-order-btn text-danger">
                        {" "}
                        <i
                          className="fa fa-times"
                          onClick={() => editMeal(item, "delete")}
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
                          onClick={() => editTea(item, "decreament")}
                        ></i>
                      </div>
                      <div className="delete-order-btn text-danger">
                        {" "}
                        <i
                          className="fa fa-times"
                          onClick={() => editTea(item, "delete")}
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
