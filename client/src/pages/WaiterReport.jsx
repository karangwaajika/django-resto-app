import OrdersReportTable from "../components/OrdersReportTable";
import ButtonIcon from "../components/ui/ButtonIcon";
import CustomDatePicker from "../components/ui/CustomDatePicker";
import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillDetailsModal from "../components/BillDetailsModal";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchReports from "../hooks/useFetchReports";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import ReportInputField from "../components/ui/ReportInputField";

export default function WaiterReport() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const FromDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <CustomDatePicker
      label="From"
      icon="fa-regular fa-calendar-days"
      reff={ref}
      onClick={onClick}
      value={value}
    />
  ));
  const ToDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <CustomDatePicker
      label="To"
      icon="fa-regular fa-calendar-days"
      reff={ref}
      onClick={onClick}
      value={value}
    />
  ));

  const params = useParams();
  //   retrieve orders
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_WAITER_REPORT_API_DEPLOY +
      "/" +
      params.waiterId
    : import.meta.env.VITE_REACT_APP_WAITER_REPORT_API + "/" + params.waiterId;
  const { data, isLoading, message, clearMessage } = useFetchReports(
    url,
    search,
    startDate,
    endDate,
    isSubmit,
    setIsSubmit
  );
  //   retrieve orders
  const isDev = import.meta.env.MODE === "production";
  const urls = isDev
    ? import.meta.env.VITE_REACT_APP_GET_USER_API_DEPLOY + "/" + params.waiterId
    : import.meta.env.VITE_REACT_APP_GET_USER_API + "/" + params.waiterId;
  const { data: userData } = useFetchData(urls);

  // handle bill modal
  const [beverageItems, setBeverageItem] = useState([]);
  const [mealItems, setMealItem] = useState([]);
  const [teaItems, setTeaItem] = useState([]);
  const [singleOrder, setSingleOrder] = useState({});
  const [billTotal, setBillTotal] = useState(0);

  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);
  const [openBillModal, setOpenBillModal] = useState(false);
  const handleBillModal = (
    orderIndex,
    beverages,
    meals,
    teas,
    billTotal,
    singleOrder
  ) => {
    // get targeted order id

    setClickedRow(orderIndex);
    setBeverageItem(beverages);
    setMealItem(meals);
    setTeaItem(teas);
    setBillTotal(billTotal);
    setSingleOrder(singleOrder);

    setAnimation(openBillModal ? "animated fadeOut" : "animated fadeIn");
    setTimeout(() => {
      setOpenBillModal((oldModalState) => !oldModalState);
    }, 1000);
  };
  return (
    <div className="view-beverage-content">
      <div className="beverage-header">
        <h2>
          List of{" "}
          {userData.first_name
            ? userData.first_name + " " + userData.last_name
            : "....."}{" "}
          orders
        </h2>
        <p style={{ fontSize: "14px" }}>
          Filter date range to retrieve the desired information
        </p>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
      </div>
      <div className="general-header">
        <div
          className="search-btn"
          style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
        >
          <ReportInputField
            type="search"
            name="search"
            id="search"
            label="Key"
            icon="fa-solid fa-filter"
            placeholder="Search ... "
            handleChange={(e) => setSearch(e.target.value)}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            customInput={<FromDateInput />}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            customInput={<ToDateInput />}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div className="report-btn">
          <ButtonIcon
            text="FILTER"
            className="btn btn-success-outline"
            width="235px"
            height="30px"
            onClick={() => setIsSubmit((oldState) => !oldState)}
          />
        </div>
      </div>
      <OrdersReportTable orders={data} openModal={handleBillModal} />
      {openBillModal && (
        <BillDetailsModal
          beverages={beverageItems}
          teas={teaItems}
          meals={mealItems}
          billTotal={billTotal}
          closeModal={handleBillModal}
          animate={animation}
          orderIndex={clickedRow}
          order={singleOrder}
        />
      )}
      {isLoading && (
        <div className="loader-service">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
    </div>
  );
}
