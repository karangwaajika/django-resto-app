import Button from "./ui/Button";
import ButtonLoading from "./ui/ButtonLoading";
import useDeleteTea from "../hooks/useDeleteTea";
import { addComma } from "../utils/addComma.mjs";
import { formatToDateString } from "../utils/dateFormat.mjs";
import loadingImg from "/images/r-loading.gif";
import FlashMessage from "./ui/FlashMessage";
export default function DeleteTeaModal({ closeModal, tea }) {
  const { isLoading, message, clearMessage, submitForm } = useDeleteTea(tea, closeModal);

  const handleCloseModal = (e) => {
    if (e.target.className == "modal animated fadeIn") {
      closeModal();
    }
  };

  return (
    <div className="modal animated fadeIn" onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{tea.name}</h2>
          <div className="modal-close-button" onClick={closeModal}>
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{tea.name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Category</span>
            <span>{tea.tea_type}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Price</span>
            <span>{addComma(tea.price ? tea.price : 0)}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{formatToDateString(tea.created_at)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options">
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={closeModal}
            />

            {isLoading ? (
              <ButtonLoading
                text="Delete"
                className="btn-danger"
                img={loadingImg}
              />
            ) : (
              <Button
                text="Delete"
                className="btn-danger"
                onClick={submitForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
