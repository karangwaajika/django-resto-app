import Button from "./ui/Button";
import ButtonLoading from "./ui/ButtonLoading";
import useDeleteMeal from "../hooks/useDeleteMeal";
import { addComma } from "../utils/addComma.mjs";
import { formatToDateString } from "../utils/dateFormat.mjs";
import loadingImg from "/images/r-loading.gif";
import FlashMessage from "./ui/FlashMessage";
export default function DeleteMealModal({ closeModal, meal }) {
  const { isLoading, message, clearMessage, submitForm } = useDeleteMeal(
    meal,
    closeModal
  );

  const handleCloseModal = (e) => {
    if (e.target.className == "modal animated fadeIn") {
      closeModal();
    }
  };

  return (
    <div className="modal animated fadeIn" onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{meal.name}</h2>
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
            <span>{meal.name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Category</span>
            <span>{meal.meal_type}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Price</span>
            <span>{addComma(meal.price ? meal.price : 0)}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{formatToDateString(meal.created_at)}</span>
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
