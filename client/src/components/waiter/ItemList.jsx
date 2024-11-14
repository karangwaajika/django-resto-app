import React, { useState } from "react";
import loaderPicture from "/images/loading-3.gif";

function ItemList({ setForm, input, data, typeModal, isLoading, inputValue }) {
  const [closeModal, setCloseModal] = useState(input);
  let itemList = null;
  // fetch beverages
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
  if (typeModal == "beverage") {
    itemList = beverageList;
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
    setCloseModal(false);
  };
  return (
    <>
      {closeModal && (
        <div className={`card dropdown-list`}>
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
