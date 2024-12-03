import React, { useState } from "react";
import FlashMessage from "../../components/ui/FlashMessage";
import InputField from "../../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import OrderTable from "../../components/waiter/OrderTable";
import BillModal from "../../components/waiter/BillModal";

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

  // handle bill modal
  const [beverageItems, setBeverageItem] = useState([]);
  const [mealItems, setMealItem] = useState([]);
  const [teaItems, setTeaItem] = useState([]);
  const [billTotal, setBillTotal] = useState(0);

  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);
  const [openBillModal, setOpenBillModal] = useState(false);
  const handleBillModal = (orderIndex, beverages, meals, teas, billTotal) => {
    // get targeted order id
    setClickedRow(orderIndex);
    setBeverageItem(beverages);
    setMealItem(meals);
    setTeaItem(teas);
    setBillTotal(billTotal);

    setAnimation(openBillModal ? "animated fadeOut" : "animated fadeIn");
    setTimeout(() => {
      setOpenBillModal((oldModalState) => !oldModalState);
    }, 1000);
  };
  return (
    <section className="content">
      <div className="content-header">
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
      <OrderTable orders={data} openModal={handleBillModal} />
      {openBillModal && (
        <BillModal
          beverages={beverageItems}
          teas={teaItems}
          meals={mealItems}
          billTotal={billTotal}
          closeModal={handleBillModal}
          animate={animation}
          orderIndex={clickedRow}
        />
      )}

      {isLoading && (
        <div className="loader-service">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
    </section>
  );
}

export default ViewOrders;
