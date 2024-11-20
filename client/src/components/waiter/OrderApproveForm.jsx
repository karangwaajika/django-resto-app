import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import loadingImg from "/images/n-loading.gif";
import { addComma } from "../../utils/addComma.mjs";

function OrderApproveForm({ order }) {
  return (
    <aside className="card form-section">
      <div
        className="card-header text-dark"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>Approve Payment </div>
        <div>Client : {order.customer_name} </div>
      </div>
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
                  <div
                    className="loading-page"
                    style={{ width: "50%" }}
                  ></div>
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
                  <div
                    className="loading-page"
                    style={{ width: "50%" }}
                  ></div>
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
                  <div
                    className="loading-page"
                    style={{ width: "50%" }}
                  ></div>
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
                    {addComma(order.amount_to_pay)} Rwf
                  </strong>
                ) : (
                  <div
                    className="loading-page"
                    style={{ width: "50%" }}
                  ></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <InputField
              type="number"
              name="price"
              id="price"
              label="Cash"
              icon="fa-regular fa-money-bill-1"
              placeholder="Cash"
            />
            <InputField
              type="number"
              name="price"
              id="price"
              label="Momo"
              icon="fa fa-mobile-button"
              placeholder="Momo"
            />
          </div>
          <InputField
            type="text"
            name="customer_name"
            id="price"
            label="Client"
            icon="fa fa-user"
            placeholder="Client"
          />
          <Textarea
            name="comment"
            id="price"
            label="Comment"
            placeholder="Write something ....."
            height="50px"
          />
          <Button text="Submit" className="btn-dark" />
        </form>
      </div>
    </aside>
  );
}

export default OrderApproveForm;
