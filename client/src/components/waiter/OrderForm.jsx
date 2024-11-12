import React from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";

function OrderForm() {
  return (
    <aside className="form">
      <h1 style={{ marginBottom: "30px", fontFamily: "cursive" }}>Order</h1>

      <div className="section-menus">
        <div className="type beverage">
          <InputField
            type="number"
            name="beverage"
            id="price"
            label="Drink"
            icon="fa-solid fa-wine-bottle"
            placeholder="Drink"
            height="30px"
          />
          <InputField
            type="number"
            name="beverageQty"
            id="beverageqty"
            label="Qty"
            icon="fa-solid fa-weight-scale"
            placeholder="Qty"
            height="30px"
          />
          <div className="add-btn">
            <i className="fa fa-plus"></i>
          </div>
        </div>
        <div className="type meal">
          <InputField
            type="number"
            name="meal"
            id="meal"
            label="Meal"
            icon="fa-solid fa-cutlery"
            placeholder="Meal"
            height="30px"
          />
          <InputField
            type="number"
            name="mealQty"
            id="mealQty"
            label="Qty"
            icon="fa-solid fa-weight-scale"
            placeholder="Qty"
            height="30px"
          />
          <div className="add-btn">
            <i className="fa fa-plus"></i>
          </div>
        </div>
        <div className="type smoothy">
          <InputField
            type="number"
            name="smoothy"
            id="smoothy"
            label="Smoothy"
            icon="fa-solid fa-blender"
            placeholder="Smoothy"
            height="30px"
          />
          <InputField
            type="number"
            name="smoothyQty"
            id="smoothyQty"
            label="Qty"
            icon="fa-solid fa-weight-scale"
            placeholder="Qty"
            height="30px"
          />
          <div className="add-btn">
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="order-details">
        <InputField
          type="text"
          name="customer"
          id="customer"
          label="Client"
          icon="fa-solid fa-user"
          placeholder="Client"
          height="30px"
        />
        <InputField
          type="number"
          name="bill"
          id="bill"
          label="Bill"
          icon="fa-solid fa-dollar"
          placeholder="Bill Number"
          height="30px"
        />

        <div className={`input-group`}>
          <span className="input-icon">
            <i className="fa-solid fa-list"></i>
          </span>
          <select name="beverage" id="beverage" className="input-field">
            <option value="">Dine-in</option>
            <option value="">To-Go</option>
            <option value="">Online</option>
          </select>
          <span className="input-text">OrderType</span>
        </div>
      </div>
      <div className="order-buttons">
        <Button
          text="Record"
          className="btn-outline-service"
          name="add-brand"
        />
        <Button
          text="New Bill"
          className="btn-outline-service"
          name="add-brand"
        />
      </div>
    </aside>
  );
}

export default OrderForm;
