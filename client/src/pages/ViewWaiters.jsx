import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import { useState, createContext } from "react";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";
import EmployeeTable from "../components/EmployeeTable";
import WaiterRoleModal from "../components/WaiterRoleModal";
import FlashMessage from "../components/ui/FlashMessage";
import WaiterActivateModal from "../components/WaiterActivateModal";
import WaiterPasswordModal from "../components/WaiterPasswordModal";

// for importiing employees data and states to make parent component rerender
export const employeesDataContext = createContext();

export default function ViewWaiters() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_EMPLOYEES_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_EMPLOYEES_API;
  const {
    data,
    isLoading,
    message,
    setData,
    setMessage,
    setIsLoading,
    clearMessage,
  } = useFetchAutoComplete(url, search);

  // handle modals
  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openActivateModal, setOpenActivateModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const handleModal = (employeeIndex, typeOfModal) => {
    // get targeted employee id
    setClickedRow(employeeIndex);

    if (typeOfModal == "role") {
      setAnimation(openRoleModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenRoleModal((oldModalState) => !oldModalState);
      }, 1000);
    } else if (typeOfModal == "activate") {
      setAnimation(openActivateModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenActivateModal((oldModalState) => !oldModalState);
      }, 1000);
    } else {
      setAnimation(openPasswordModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenPasswordModal((oldModalState) => !oldModalState);
      }, 1000);
    }
  };

  return (
    <div className="view-waiter-content">
      <div className="waiter-header">
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

      <EmployeeTable employees={data} openModal={handleModal} />
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
      <employeesDataContext.Provider
        value={{ setData, setIsLoading, setMessage }}
      >
        {openRoleModal && (
          <WaiterRoleModal
            allEmployees={data}
            employeeIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </employeesDataContext.Provider>

      <employeesDataContext.Provider
        value={{ setData, setIsLoading, setMessage }}
      >
        {openActivateModal && (
          <WaiterActivateModal
            allEmployees={data}
            employeeIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </employeesDataContext.Provider>

      <employeesDataContext.Provider
        value={{ setData, setIsLoading, setMessage }}
      >
        {openPasswordModal && (
          <WaiterPasswordModal
            allEmployees={data}
            employeeIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </employeesDataContext.Provider>
    </div>
  );
}
