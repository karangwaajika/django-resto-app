import "../assets/Tea.css";
import TeaTable from "../components/TeaTable";
import InputField from "../components/ui/InputField";
import useFetchData from "../hooks/useFetchData";
import FlashMessage from "../components/ui/FlashMessage";
import loaderPicture from "/images/loading-3.gif";
import { useState } from "react";
import EditTeaModal from "../components/EditTeaModal";

export default function ViewTeas() {
  const { data, isLoading, message } = useFetchData(
    import.meta.env.VITE_REACT_APP_VIEW_TEAS_API
  );
  const [rowToEdit, setrowToEdit] = useState(null);

  const [animation, setAnimation] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModal = (index) => {
    // get targeted tea information
    setrowToEdit(index);
    setAnimation(openEditModal ? "animated fadeOut" : "animated fadeIn");
    setTimeout(() => {
      setOpenEditModal((oldModalState) => !oldModalState);
    }, 1000);
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
        />
      </div>
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
      <TeaTable teas={data} openEditModal={handleEditModal} />
      {openEditModal && (
        <EditTeaModal
          closeModal={handleEditModal}
          animation={animation}
          tea={rowToEdit >= 0 && data[rowToEdit]}
        />
      )}
    </div>
  );
}
