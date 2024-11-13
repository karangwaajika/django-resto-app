import React from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import FlashMessage from "../ui/FlashMessage";
import ButtonLoading from "../ui/ButtonLoading";
import loadingImg from "/images/n-loading.gif";

function OrderForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
  ...props
}) {
  return (
    <aside className="form">
      <h1 style={{ marginBottom: "30px", fontFamily: "cursive" }}>Order</h1>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      {/* <form onSubmit={submitForm} > */}
      <div className="section-menus">
        <div className="type beverage">
          <InputField
            type="text"
            name="beverageName"
            id="beverageId"
            label="Drink"
            icon="fa-solid fa-wine-bottle"
            placeholder="Drink"
            height="30px"
            errorfield={props.beverageFieldError.beverageName && "error-field"}
            handleChange={props.handleBeverageChange}
            value={props.beverageForm.beverageName}
            errorMessage={props.beverageFieldError.beverageName}
          />
          <InputField
            type="number"
            name="beverageQty"
            id="beverageqty"
            label="Qty"
            icon="fa-solid fa-weight-scale"
            placeholder="Qty"
            height="30px"
            errorfield={props.beverageFieldError.beverageQty && "error-field"}
            handleChange={props.handleBeverageChange}
            value={
              props.beverageForm.beverageQty == 0
                ? ""
                : props.beverageForm.beverageQty
            }
            errorMessage={props.beverageFieldError.beverageQty}
          />
          <div className="add-btn" onClick={props.addBeverage}>
            <i className="fa fa-plus"></i>
          </div>
        </div>
        <div className="type meal">
          <InputField
            type="text"
            name="mealName"
            id="mealId"
            label="Meal"
            icon="fa-solid fa-cutlery"
            placeholder="Meal"
            height="30px"
            errorfield={props.mealFieldError.mealName && "error-field"}
            handleChange={props.handleMealChange}
            value={props.mealForm.mealName}
            errorMessage={props.mealFieldError.mealName}
          />
          <InputField
            type="number"
            name="mealQty"
            id="mealQty"
            label="Qty"
            icon="fa-solid fa-weight-scale"
            placeholder="Qty"
            height="30px"
            errorfield={props.mealFieldError.mealQty && "error-field"}
            handleChange={props.handleMealChange}
            value={props.mealForm.mealQty == 0 ? "" : props.mealForm.mealQty}
            errorMessage={props.mealFieldError.mealQty}
          />
          <div className="add-btn" onClick={props.addMeal}>
            <i className="fa fa-plus"></i>
          </div>
        </div>
        <div className="type smoothy">
          <InputField
            type="text"
            name="teaName"
            id="smoothy"
            label="Smoothy"
            icon="fa-solid fa-blender"
            placeholder="Smoothy"
            height="30px"
            errorfield={props.teaFieldError.teaName && "error-field"}
            handleChange={props.handleTeaChange}
            value={props.teaForm.teaId}
            errorMessage={props.teaFieldError.teaName}
          />
          <InputField
            type="number"
            name="teaQty"
            id="smoothyQty"
            label="Qty"
            icon="fa-solid fa-weight-scale"
            placeholder="Qty"
            height="30px"
            errorfield={props.teaFieldError.teaQty && "error-field"}
            handleChange={props.handleTeaChange}
            value={props.teaForm.teaQty == 0 ? "" : props.teaForm.teaQty}
            errorMessage={props.teaFieldError.teaQty}
          />
          <div className="add-btn" onClick={props.addTea}>
            <i className="fa fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="order-details">
        <InputField
          type="text"
          name="customerName"
          id="customer"
          label="Client"
          icon="fa-solid fa-user"
          placeholder="Client"
          height="30px"
          errorfield={fieldError.customerName && "error-field"}
          handleChange={handleChange}
          value={form.customerName}
          errorMessage={fieldError.customerName}
        />
        <InputField
          type="number"
          name="orderId"
          id="bill"
          label="Bill"
          icon="fa-solid fa-money-bill"
          placeholder="Bill Number"
          height="30px"
          errorfield={fieldError.orderId && "error-field"}
          handleChange={handleChange}
          value={form.orderId}
          errorMessage={fieldError.orderId}
        />

        <div className={`input-group`}>
          <span className="input-icon">
            <i className="fa-solid fa-list"></i>
          </span>
          <select
            name="orderType"
            id="beverage"
            className="input-field"
            value={form.orderType}
            onChange={handleChange}
            errorfield={fieldError.orderType && "error-field"}
          >
            <option value="1">Dine-in</option>
            <option value="2">To-Go</option>
            <option value="3">Online</option>
          </select>
          <span className="input-text">OrderType</span>
        </div>
      </div>
      <div className="order-buttons">
        {isLoading ? (
          <ButtonLoading
            text="Submit"
            className="btn-outline-service"
            img={loadingImg}
          />
        ) : (
          <Button
            text="Record"
            className="btn-outline-service"
            name=""
            onClick={submitForm}
          />
        )}

        <Button text="New Bill" className="btn-outline-service" name="" />
      </div>
      {/* </form> */}
    </aside>
  );
}

export default OrderForm;
