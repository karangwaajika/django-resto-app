import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ButtonLoading from "../ui/ButtonLoading";
import Textarea from "../ui/Textarea";
import loadingImg from "/images/n-loading.gif";
import { addComma } from "../../utils/addComma.mjs";
import FlashMessage from "../ui/FlashMessage";

function OrderApproveForm({
  order,
  isLoading,
  form,
  handleChange,
  submitForm,
  fieldError,
  message,
  clearMessage,
  isLoadingForm,
}) {
  let remainder = order.amount_to_pay
  if (order.overall_total == order.momo + order.cash){
    remainder = 0
  }
  return (
    <aside className="card form-section">
      <div
        className="card-header text-dark"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>Approve Payment </div>
        <div>Client : {order.customer_name} </div>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <div className="card-body">
        <div className="card">
          <div className="card-body text-dark">
            <ul style={{ listStyle: "none" }}>
              <li
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Receipt Number :{" "}
                {order.id ? (
                  <strong> # {order.id}</strong>
                ) : (
                  <div className="loading-page" style={{ width: "50%" }}></div>
                )}
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Amount Consumed :{" "}
                {order.overall_total ? (
                  <strong> {addComma(order.overall_total)} frw</strong>
                ) : (
                  <div className="loading-page" style={{ width: "50%" }}></div>
                )}
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Amount Paid :{" "}
                {order.amount_paid >= 0 ? (
                  <strong>{addComma(order.amount_paid)} frw</strong>
                ) : (
                  <div className="loading-page" style={{ width: "50%" }}></div>
                )}
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Remainder :{" "}
                {order.amount_to_pay ? (
                  <strong className="span span-danger">
                    {" "}
                    {addComma(remainder)} Rwf
                  </strong>
                ) : (
                  <div className="loading-page" style={{ width: "50%" }}></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <form onSubmit={submitForm} className="form" style={{gap:"10px"}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap:"20px"
            }}
          >
            <div style={{ width: "100%" }}>
              <InputField
                type="number"
                name="cash"
                id="cash"
                label="Cash"
                icon="fa-regular fa-money-bill-1"
                placeholder="Cash"
                value={form.cash}
                handleChange={handleChange}
                errorfield={fieldError.cash && "error-field"}
                errorMessage={fieldError.cash}
              />
            </div>
            <div style={{ width: "100%" }}>
              <InputField
                type="number"
                name="momo"
                id="momo"
                label="Momo"
                icon="fa fa-mobile-button"
                placeholder="Momo"
                value={form.momo}
                handleChange={handleChange}
                errorfield={fieldError.momo && "error-field"}
                errorMessage={fieldError.momo}
              />
            </div>
          </div>
          <div>
            <InputField
              type="text"
              name="customerName"
              id="customerName"
              label="Client"
              icon="fa fa-user"
              placeholder={order.customer_name}
              value={form.customerName}
              handleChange={handleChange}
              errorfield={fieldError.customerName && "error-field"}
              errorMessage={fieldError.customerName}
            />
          </div>

          <Textarea
            name="comment"
            id="comment"
            label="Comment"
            placeholder="Write something ....."
            height="50px"
            value={form.commment}
            handleChange={handleChange}
          />
          {isLoadingForm ? (
            <ButtonLoading
              text="Submit"
              className="btn-dark"
              img={loadingImg}
            />
          ) : (
            <Button text="Submit" className="btn-dark" name="add-brand" />
          )}
        </form>
      </div>
    </aside>
  );
}

export default OrderApproveForm;
