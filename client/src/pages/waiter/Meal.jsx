import { useState } from "react";
import FlashMessage from "../../components/ui/FlashMessage";
import InputField from "../../components/ui/InputField";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import loaderPicture from "/images/loading-3.gif";
import MealTable from "../../components/waiter/MealTable";

function Meal() {
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
  return (
    <section className="menu">
      <aside className="items">
        <div className="search-btn">
          <InputField
            type="search"
            name="search"
            id="search"
            label="Search"
            icon="fa-solid fa-search"
            placeholder="search... "
            handleChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <MealTable meals={data} />
        {isLoading && (
          <div className="loader">
            <img src={loaderPicture} width={100} height={100} />
          </div>
        )}
      </aside>
    </section>
  );
}

export default Meal;
