import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import { useState } from "react";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";
import EmployeeTable from "../components/EmployeeTable";

export default function ViewBeverages() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_EMPLOYEES_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_EMPLOYEES_API;
  const { data, isLoading, message } = useFetchAutoComplete(url, search);

  return (
    <div className="view-beverage-content">
      <div className="beverage-header">
        <h2>List of Employees</h2>
        <p style={{ fontSize: "14px" }}>
          Search by names to retrieve the desired information
        </p>
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
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
      <EmployeeTable employees={data} />
    </div>
  );
}
