import Button from "./ui/Button";
import useDeleteBeverage from "../hooks/useDeleteBeverage";
import { addComma } from "../utils/addComma.mjs";
export default function DeleteBeverageModal({
  closeModal,
  allBeverages,
  beverageIndex,
  animate,
}) {
  const beverage = allBeverages[beverageIndex];
  const { submitForm } = useDeleteBeverage(beverage, closeModal, beverageIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(beverageIndex, "delete");
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{beverage.beverage.name}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(beverageIndex, "delete")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{beverage.beverage.name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Category</span>
            <span>{beverage.beverage.beverage_type}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Price</span>
            <span>{addComma(beverage.price ? beverage.price : 0)}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Qty</span>
            <span>{addComma(beverage.qty)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{gap: "10px"}}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(beverageIndex, "delete")}
            />
            <Button text="Delete" className="btn-danger" onClick={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
