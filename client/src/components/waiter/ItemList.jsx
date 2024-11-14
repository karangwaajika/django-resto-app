import React, { useState } from "react";
import loaderPicture from "/images/loading-3.gif";
import FlashMessage from "../ui/FlashMessage";

function ItemList({
  setForm,
  input,
  data,
  typeModal,
  isLoading,
  inputValue,
  message,
  clearMessage,
}) {
  const [closeModal, setCloseModal] = useState(input);
  let itemList = null;
  // fetch beverages
  if (typeModal == "beverage") {
    const beverageList =
      data.length > 0
        ? data.map((item, i) => {
            return (
              <li onClick={() => selectItem(item)} key={i}>
                {item.beverage.name}
              </li>
            );
          })
        : `No " ${inputValue} " in beverage`;
    itemList = beverageList;
  }
  // fetch meal
  if (typeModal == "meal") {
    const mealList =
      data.length > 0
        ? data.map((item, i) => {
            return (
              <li onClick={() => selectItem(item)} key={i}>
                {item.name}
              </li>
            );
          })
        : `No " ${inputValue} " in meal`;
    itemList = mealList;
  }
  const selectItem = (item) => {
    if (typeModal == "beverage") {
      setForm((oldForm) => {
        return {
          ...oldForm,
          beverageName: item.beverage.name,
          beveragePrice: item.price,
        };
      });
    }
    if (typeModal == "meal") {
      setForm((oldForm) => {
        return {
          ...oldForm,
          mealName: item.name,
          mealPrice: item.price,
        };
      });
    }
    setCloseModal(false);
  };
  return (
    <>
      {closeModal && (
        <div className={`card dropdown-list`}>
          {message && (
            <FlashMessage
              message={message.message}
              isSuccess={message.success}
              clearMessage={clearMessage}
            />
          )}
          {isLoading ? (
            <div className="loader">
              <img src={loaderPicture} width={100} height={100} />
            </div>
          ) : (
            <ul>{itemList}</ul>
          )}
        </div>
      )}
    </>
  );
}

export default ItemList;
