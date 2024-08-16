import "../assets/Meal.css";
import MealTable from "../components/MealTable";
import InputField from "../components/ui/InputField";
import FlashMessage from "../components/ui/FlashMessage";
import loaderPicture from "/images/loading-3.gif";
import { useState, createContext } from "react";
import EditMealModal from "../components/EditMealModal";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";

export const updateMealContext = createContext();

export default function ViewMeals() {
  // to trigger fetch data when meal is updated to re-render the component
  const [refreshData, setRefreshData] = useState(false);
  const handleRefreshData = () => {
    setRefreshData((oldstate) => !oldstate);
  };
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const { data, isLoading, message } = useFetchAutoComplete(
    import.meta.env.VITE_REACT_APP_VIEW_MEALS_API,
    search,
    refreshData
  );

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

  return (
    <div className="view-meal-content">
      <div className="meal-header">
        <h2>List of all kind of Meals</h2>
        <p style={{ fontSize: "14px" }}>
          Search by name or category to retrieve the desired drinks
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
      <MealTable
        meals={data}
        openEditModal={handleEditModal}
      />

      <updateMealContext.Provider value={handleRefreshData}>
        {openEditModal && (
          <EditMealModal
            closeModal={handleEditModal}
            animation={animation}
            meal={rowToEdit >= 0 && data[rowToEdit]}
          />
        )}
      </updateMealContext.Provider>
    </div>
  );
}
