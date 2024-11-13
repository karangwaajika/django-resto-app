import React from "react";

function ItemList({ setBeverageForm, closeModal }) {
  const selectItem = (e) => {
    setBeverageForm((oldForm) => {
      return { ...oldForm, beverageName: "Beverages" };
    });
    e.target.parentElement.parentElement.remove();
  };
  return (
    <div className={`card dropdown-list`}>
      <ul>
        <li onClick={selectItem}>Beverages</li>
        <li>Meals</li>
        <li>Smoothies</li>
      </ul>
    </div>
  );
}

export default ItemList;
