import "../assets/Meal.css";
import BeverageTable from "../components/BeverageTable";
import InputField from "../components/ui/InputField";
import FlashMessage from "../components/ui/FlashMessage";
import loaderPicture from "/images/loading-3.gif";
import { useState } from "react";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";

export default function ViewBeverages() {
  // to trigger fetch data when meal is updated to re-render the component
  const [refreshData, setRefreshData] = useState(false);
  const handleRefreshData = () => {
    setRefreshData((oldstate) => !oldstate);
  };
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const { data, isLoading, message } = useFetchAutoComplete(
    import.meta.env.VITE_REACT_APP_VIEW_BEVERAGES_API,
    search,
    refreshData
  );


  return (
    <div className="view-beverage-content">
      <div className="beverage-header">
        <h2>List of all kind of Beverages</h2>
        <p style={{ fontSize: "14px" }}>
          Search by name or category to retrieve the desired beverages
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
      <BeverageTable
        beverages={data}
      />

    </div>
  );
}
