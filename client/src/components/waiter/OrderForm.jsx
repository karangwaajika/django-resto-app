import React, { useState } from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import FlashMessage from "../ui/FlashMessage";
import ButtonLoading from "../ui/ButtonLoading";
import loadingImg from "/images/n-loading.gif";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import useFetchItem from "../../hooks/useFetchItem";
import ItemList from "./ItemList";
import loaderPicture from "/images/loading-3.gif";

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
  const isDevelopment = import.meta.env.MODE === "production";

  // beverage url and fetch
  const beverageUrl = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_BEVERAGES_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_BEVERAGES_API;
  const {
    data: beverageData,
    isLoading: beverageIsLoading,
    message: beverageMessage,
    clearMessage: beverageClearMessage,
  } = useFetchItem(beverageUrl, props.beverageForm.beverageName);

  // meal url and fetch
  const mealUrl = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_MEALS_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_MEALS_API;
  const {
    data: mealData,
    isLoading: mealIsLoading,
    message: mealMessage,
    clearMessage: mealClearMessage,
  } = useFetchItem(mealUrl, props.mealForm.mealName);

  // tea/smoothy url and fetch
  const teaUrl = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_TEAS_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_TEAS_API;
  const {
    data: teaData,
    isLoading: teaIsLoading,
    message: teaMessage,
    clearMessage: teaClearMessage,
  } = useFetchItem(teaUrl, props.teaForm.teaName);

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
      {isLoading && (
        <div className="loader-service">
          <img src={loaderPicture} width={100} height={100} />
        </div>
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
          {props.beverageForm.beverageName && (
            <ItemList
              setForm={props.setBeverageForm}
              input={props.beverageForm.beverageName ? true : false}
              data={beverageData}
              typeModal="beverage"
              isLoading={beverageIsLoading}
              inputValue={props.beverageForm.beverageName}
              message={beverageMessage}
              clearMessage={beverageClearMessage}
            />
          )}
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
          {props.mealForm.mealName && (
            <ItemList
              setForm={props.setMealForm}
              input={props.mealForm.mealName ? true : false}
              data={mealData}
              typeModal="meal"
              isLoading={mealIsLoading}
              inputValue={props.mealForm.mealName}
              message={mealMessage}
              clearMessage={mealClearMessage}
            />
          )}
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
            value={props.teaForm.teaName}
            errorMessage={props.teaFieldError.teaName}
          />
          {props.teaForm.teaName && (
            <ItemList
              setForm={props.setTeaForm}
              input={props.teaForm.teaName ? true : false}
              data={teaData}
              typeModal="smoothy"
              isLoading={teaIsLoading}
              inputValue={props.teaForm.teaName}
              message={teaMessage}
              clearMessage={teaClearMessage}
            />
          )}
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
            <option value={1}>Dine-in</option>
            <option value={2}>To-Go</option>
            <option value={3}>Online</option>
          </select>
          <span className="input-text">OrderType</span>
        </div>
      </div>
      <div className="order-buttons">
        <Button
          text="Record"
          className="btn-outline-service"
          name=""
          onClick={submitForm}
        />

        <Button text="New Bill" className="btn-outline-service" name="" />
      </div>
      {/* </form> */}
    </aside>
  );
}

export default OrderForm;
