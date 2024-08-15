import "../assets/Tea.css";
import TeaTable from "../components/TeaTable";
import InputField from "../components/ui/InputField";
import useFetchData from "../hooks/useFetchData";
import FlashMessage from "../components/ui/FlashMessage";
import loaderPicture from "/images/loading-3.gif";
import { useState, createContext } from "react";
import EditTeaModal from "../components/EditTeaModal";
import DeleteTeaModal from "../components/DeleteTeaModal";
import useFetchAutoComplete from "../hooks/useFetchAutoComplete";

export const updateTeaContext = createContext();

export default function ViewTeas() {
  // to trigger fetch data when tea is updated to re-render the component
  const [refreshData, setRefreshData] = useState(false);
  const handleRefreshData = () => {
    setRefreshData((oldstate) => !oldstate);
  };
  // handle fetch auto complete
  const [search, setSearch] = useState("");
  const { data, isLoading, message } = useFetchAutoComplete(
    import.meta.env.VITE_REACT_APP_VIEW_TEAS_API,
    search,
    refreshData
  );

  const [animation, setAnimation] = useState("");

  // handle update
  const [rowToEdit, setrowToEdit] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModal = (index) => {
    // get targeted tea information
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
    // get targeted tea information
    setrowToDelete(index);
    setOpenDeleteModal((oldModalState) => !oldModalState);
  };

  return (
    <div className="view-tea-content">
      <div className="tea-header">
        <h2>List of all kind of Drinks</h2>
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
      <TeaTable
        teas={data}
        openEditModal={handleEditModal}
        openDeleteModal={handleDeleteModal}
      />

      <updateTeaContext.Provider value={handleRefreshData}>
        {openEditModal && (
          <EditTeaModal
            closeModal={handleEditModal}
            animation={animation}
            tea={rowToEdit >= 0 && data[rowToEdit]}
          />
        )}
      </updateTeaContext.Provider>

      <updateTeaContext.Provider value={handleRefreshData}>
        {openDeleteModal && (
          <DeleteTeaModal
            closeModal={handleDeleteModal}
            tea={rowToDelete >= 0 && data[rowToDelete]}
          />
        )}
      </updateTeaContext.Provider>
    </div>
  );
}
