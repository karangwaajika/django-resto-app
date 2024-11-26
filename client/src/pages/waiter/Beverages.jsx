import { useState } from "react";
import FlashMessage from "../../components/ui/FlashMessage";
import InputField from "../../components/ui/InputField";
import useFetchAutoComplete from "../../hooks/useFetchAutoComplete";
import BeverageTable from "../../components/waiter/BeverageTable";
import loaderPicture from "/images/loading-3.gif";
import beverageImage from "/images/drink1.jpeg";

function Beverages() {
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
        <BeverageTable beverages={data} />
        {isLoading && (
          <div className="loader">
            <img src={loaderPicture} width={100} height={100} />
          </div>
        )}
      </aside>
    </section>
  );
}

export default Beverages;
