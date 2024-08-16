import "../assets/Meal.css";
import MealTable from "../components/MealTable";
import InputField from "../components/ui/InputField";
import FlashMessage from "../components/ui/FlashMessage";
import loaderPicture from "/images/loading-3.gif";
import { useState } from "react";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";

export default function ViewMeals() {
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const { data, isLoading, message } = useFetchAutoComplete(
    import.meta.env.VITE_REACT_APP_VIEW_MEALS_API,
    search,
    refreshData
  );

  const [animation, setAnimation] = useState("");

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
      />
    </div>
  );
}
