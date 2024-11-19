import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import loadingImg from "/images/n-loading.gif";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";

function ApproveBill({}) {
  const params = useParams();
  const isDevelopment = import.meta.env.MODE === "production";
  let url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_APPROVE_BILL_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_APPROVE_BILL_API;
  url += "/" + params.orderId;
  const { data } = useFetchData(url);

  return (
    <section className="approve-bill">
      <aside className="card form-section">
        <div
          className="card-header text-dark"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>Approve Payment </div>
          <div>Client : {data.customer_name} </div>
        </div>
        <div className="card-body">
          <div className="card">
            <div className="card-body text-dark">
              <ul style={{ listStyle: "none" }}>
                <li>
                  Receipt Number : <strong> #{data.id}</strong>
                </li>
                <li>
                  Amount Consumed : <strong> {data.overall_total}</strong> frw
                </li>
                <li>
                  Amount Paid : <strong> {data.amount_paid}</strong> frw
                </li>
                <li>
                  Remainder :{" "}
                  <strong className="span span-danger">
                    {" "}
                    {data.amount_to_pay}
                  </strong>{" "}
                  frw
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
              value={data.customer_name}
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
      <aside className="card order-info"></aside>
    </section>
  );
}

export default ApproveBill;
