import "../assets/Meal.css";
import BeverageTable from "../components/BeverageTable";
import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import { useState, createContext } from "react";
import EditBeverageModal from "../components/EditBeverageModal";
import DeleteBeverageModal from "../components/DeleteBeverageModal";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";
import FlashMessage from "../components/ui/FlashMessage";

export const updateBeverageContext = createContext();

export default function ViewBeverages() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_BEVERAGES_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_BEVERAGES_API;
  const {
    data,
    isLoading,
    message,
    setData,
    setMessage,
    setIsLoading,
    clearMessage,
  } = useFetchAutoComplete(url, search);

  const [animation, setAnimation] = useState("");

  // handle update
  const [rowToEdit, setrowToEdit] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModal = (index) => {
    // get targeted meal information
    setrowToEdit(index);
    setAnimation(openEditModal ? "animated fadeOut" : "animated fadeIn");
    setTimeout(() => {
      setOpenEditModal((oldModalState) => !oldModalState);
    }, 1000);
  };
  // handle delete
  const [rowToDelete, setrowToDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModal = (index) => {
    // get targeted meal information
    setrowToDelete(index);
    setOpenDeleteModal((oldModalState) => !oldModalState);
  };

  return (
    <div className="view-beverage-content">
      <div className="beverage-header">
        <h2>List of all kind of Beverages</h2>
        <p style={{ fontSize: "14px" }}>
          Search by name or category to retrieve the desired beverages
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
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
      <BeverageTable
        beverages={data}
        openEditModal={handleEditModal}
        openDeleteModal={handleDeleteModal}
      />

      <updateBeverageContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openEditModal && (
          <EditBeverageModal
            closeModal={handleEditModal}
            animation={animation}
            beverage={rowToEdit >= 0 && data[rowToEdit]}
          />
        )}
      </updateBeverageContext.Provider>

      <updateBeverageContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openDeleteModal && (
          <DeleteBeverageModal
            closeModal={handleDeleteModal}
            beverage={rowToDelete >= 0 && data[rowToDelete]}
          />
        )}
      </updateBeverageContext.Provider>
    </div>
  );
}
