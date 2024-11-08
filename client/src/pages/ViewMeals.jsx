import "../assets/Meal.css";
import MealTable from "../components/MealTable";
import InputField from "../components/ui/InputField";
import loaderPicture from "/images/loading-3.gif";
import { useState, createContext } from "react";
import EditMealModal from "../components/EditMealModal";
import DeleteMealModal from "../components/DeleteMealModal";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";
import FlashMessage from "../components/ui/FlashMessage";

export const updateMealContext = createContext();

export default function ViewMeals() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const isDevelopment = import.meta.env.MODE === "production";
  const url = isDevelopment
    ? import.meta.env.VITE_REACT_APP_VIEW_MEALS_API_DEPLOY
    : import.meta.env.VITE_REACT_APP_VIEW_MEALS_API;
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
    <div className="view-meal-content">
      <div className="meal-header">
        <h2>List of all kind of Meals</h2>
        <p style={{ fontSize: "14px" }}>
          Search by name or category to retrieve the desired meals
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
      <MealTable
        meals={data}
        openEditModal={handleEditModal}
        openDeleteModal={handleDeleteModal}
      />

      <updateMealContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openEditModal && (
          <EditMealModal
            closeModal={handleEditModal}
            animation={animation}
            meal={rowToEdit >= 0 && data[rowToEdit]}
          />
        )}
      </updateMealContext.Provider>

      <updateMealContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openDeleteModal && (
          <DeleteMealModal
            closeModal={handleDeleteModal}
            meal={rowToDelete >= 0 && data[rowToDelete]}
          />
        )}
      </updateMealContext.Provider>
    </div>
  );
}
