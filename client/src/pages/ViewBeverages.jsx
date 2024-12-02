
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

  // handle modals
  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleModal = (index, typeOfModal) => {
    // get the targeted item id
    setClickedRow(index);

    if (typeOfModal == "edit") {
      setAnimation(openEditModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenEditModal((oldModalState) => !oldModalState);
      }, 1000);
    } else {
      setAnimation(openDeleteModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenDeleteModal((oldModalState) => !oldModalState);
      }, 1000);
    }
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

      <BeverageTable
        beverages={data}
        openEditModal={handleModal}
        openDeleteModal={handleModal}
      />
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}

      <updateBeverageContext.Provider
        value={{ setData, setIsLoading, setMessage }}
      >
        {openEditModal && (
          <EditBeverageModal
            allBeverages={data}
            beverageIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </updateBeverageContext.Provider>

      <updateBeverageContext.Provider
        value={{ setData, setIsLoading, setMessage }}
      >
        {openDeleteModal && (
          <DeleteBeverageModal
            allBeverages={data}
            beverageIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </updateBeverageContext.Provider>
    </div>
  );
}
