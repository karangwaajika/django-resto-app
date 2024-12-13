import React, { useState } from "react";
import FlashMessage from "../../components/ui/FlashMessage";
import InputField from "../../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import WaiterOrderTable from "../../components/waiter/WaiterOrderTable";

function WaiterOrders() {
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_MY_SERVICES_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_MY_SERVICES_API;
  const {
    data,
    isLoading,
    message,
    setData,
    setMessage,
    setIsLoading,
    clearMessage,
  } = useFetchAutoComplete(url, search);
  return (
    <section className="content">
      <div className="content-header">
        <h2>List of My recorded orders</h2>
        <p style={{ fontSize: "14px" }}>
          Search by waiter, customer name, and menu items
        </p>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
      </div>
      <div className="search-btn">
        <InputField
          type="search"
          name="search"
          id="search"
          label="Search"
          icon="fa-solid fa-search"
          placeholder="Search ... "
          handleChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <WaiterOrderTable orders={data} />
      {isLoading && (
        <div className="loader-service">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
    </section>
  );
}

export default WaiterOrders;
