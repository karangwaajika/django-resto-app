import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import { useState } from "react";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";
import { formatToDateString } from "../utils/dateFormat.mjs";
import FlashMessage from "../components/ui/FlashMessage";
import { useNavigate } from "react-router-dom";

export default function WaitersOrders() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_EMPLOYEES_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_EMPLOYEES_API;
  const { data, isLoading, message, clearMessage } = useFetchAutoComplete(
    url,
    search
  );
  const navigate = useNavigate()

  return (
    <div className="view-beverage-content">
      <div className="beverage-header">
        <h2>List of Employees</h2>
        <p style={{ fontSize: "14px" }}>
          Search by names to retrieve the desired information
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

      <table className="dashboard-content-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Names</th>
            <th>Join on</th>
            <th>Role</th>
            <th>Active</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((employee, index) => {
              return (
                <tr key={index + 1}>
                  <td data-cell="#">{index + 1}</td>
                  <td data-cell="Name">
                    {employee.first_name + " " + employee.last_name}
                  </td>
                  <td data-cell="Date">
                    {formatToDateString(employee.date_joined)}
                  </td>
                  <td data-cell="Role">
                    {employee.is_staff ? "Bartender" : "Waiter"}{" "}
                  </td>
                  <td data-cell="Active" style={{ textAlign: "center" }}>
                    {employee.is_active ? (
                      <i className="fa fa-check-square text-success"></i>
                    ) : (
                      <i className="fa fa-square-xmark text-danger"></i>
                    )}{" "}
                  </td>
                  <td data-cell="Services">
                    <i
                      className="fa fa-eye text-primary icon-link"
                      onClick={() => navigate(`/dashboard/waiter/${employee.id}/orders`)}
                    ></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
    </div>
  );
}
