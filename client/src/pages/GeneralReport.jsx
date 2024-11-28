import Button from "../components/ui/Button";
import ButtonIcon from "../components/ui/ButtonIcon";
import ButtonLoading from "../components/ui/ButtonLoading";
import CustomDatePicker from "../components/ui/CustomDatePicker";
import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GeneralReport() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const FromDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <CustomDatePicker
      label="From"
      icon="fa-regular fa-calendar-days"
      reff={ref}
      onClick={onClick}
      value={value}
      height="30px"
      width="245px"
    />
  ));
  const ToDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <CustomDatePicker
      label="To"
      icon="fa-regular fa-calendar-days"
      reff={ref}
      onClick={onClick}
      value={value}
      height="30px"
      width="245px"
    />
  ));

  return (
    <div className="view-beverage-content">
      <div className="beverage-header">
        <h2>List of Unfiltered orders</h2>
        <p style={{ fontSize: "14px" }}>
          Filter date range to retrieve the desired information
        </p>
        {/* {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )} */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div
          className="search-btn"
          style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
        >
          <InputField
            type="search"
            name="search"
            id="search"
            label="Key"
            icon="fa-solid fa-filter"
            placeholder="Search ... "
            handleChange={(e) => setSearch(e.target.value)}
            width="250px"
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

        <ButtonIcon
          text="FILTER"
          className="btn btn-success-outline"
          width="235px"
          height="30px"
        />
      </div>
    </div>
  );
}
