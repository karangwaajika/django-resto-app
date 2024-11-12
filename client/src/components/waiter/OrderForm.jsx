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
              name="beverageId"
              id="beverageId"
              label="Drink"
              icon="fa-solid fa-wine-bottle"
              placeholder="Drink"
              height="30px"
              errorfield={fieldError.beverageId && "error-field"}
              handleChange={handleChange}
              value={form.beverageId}
              errorMessage={fieldError.beverageId}
            />
            <InputField
              type="number"
              name="beverageQty"
              id="beverageqty"
              label="Qty"
              icon="fa-solid fa-weight-scale"
              placeholder="Qty"
              height="30px"
              errorfield={fieldError.beverageQty && "error-field"}
              handleChange={handleChange}
              value={form.beverageQty}
              errorMessage={fieldError.beverageQty}
            />
            <div className="add-btn">
              <i className="fa fa-plus"></i>
            </div>
          </div>
          <div className="type meal">
            <InputField
              type="text"
              name="mealId"
              id="mealId"
              label="Meal"
              icon="fa-solid fa-cutlery"
              placeholder="Meal"
              height="30px"
              errorfield={fieldError.mealId && "error-field"}
              handleChange={handleChange}
              value={form.mealId}
              errorMessage={fieldError.mealId}
            />
            <InputField
              type="number"
              name="mealQty"
              id="mealQty"
              label="Qty"
              icon="fa-solid fa-weight-scale"
              placeholder="Qty"
              height="30px"
              errorfield={fieldError.mealQty && "error-field"}
              handleChange={handleChange}
              value={form.mealQty}
              errorMessage={fieldError.mealQty}
            />
            <div className="add-btn">
              <i className="fa fa-plus"></i>
            </div>
          </div>
          <div className="type smoothy">
            <InputField
              type="text"
              name="teaId"
              id="smoothy"
              label="Smoothy"
              icon="fa-solid fa-blender"
              placeholder="Smoothy"
              height="30px"
              errorfield={fieldError.teaId && "error-field"}
              handleChange={handleChange}
              value={form.teaId}
              errorMessage={fieldError.teaId}
            />
            <InputField
              type="number"
              name="teaQty"
              id="smoothyQty"
              label="Qty"
              icon="fa-solid fa-weight-scale"
              placeholder="Qty"
              height="30px"
              errorfield={fieldError.teaQty && "error-field"}
              handleChange={handleChange}
              value={form.teaQty}
              errorMessage={fieldError.teaQty}
            />
            <div className="add-btn">
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
            <Button text="Record" className="btn-outline-service" name="" onClick={submitForm}/>
          )}

          <Button text="New Bill" className="btn-outline-service" name="" />
        </div>
      {/* </form> */}
    </aside>
  );
}

export default OrderForm;
