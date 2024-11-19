import React, {useState} from "react";
import FlashMessage from "../../components/ui/FlashMessage";
import InputField from "../../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import OrderTable from "../../components/waiter/OrderTable";

function ViewOrders() {
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_ORDERS_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_ORDERS_API;
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
    <section className="view-meal-content">
      <div className="meal-header">
        <h2>List of all orders recorded by the waiters</h2>
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
      <OrderTable orders={data}/>
      {isLoading && (
        <div className="loader-service">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
    </section>
  );
}

export default ViewOrders;
