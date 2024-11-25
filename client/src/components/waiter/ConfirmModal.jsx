import Button from "../ui/Button";
import useDeleteTea from "../../hooks/useDeleteTea";
import { addComma } from "../../utils/addComma.mjs";
import { formatToDateString } from "../../utils/dateFormat.mjs";

export default function ConfirmModal({ itemData, animate, closeModal }) {
  // const { submitForm } = useDeleteTea(tea, closeModal, teaIndex);
  const submitForm = () => "hello";

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(false);
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{itemData.itemName}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(false)}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{itemData.itemName}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Sold Qty</span>
            <span>{itemData.itemQty}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Price</span>
            <span>{itemData.itemPrice}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Total</span>
            <span>{itemData.itemTotal}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{itemData.itemSoldDate}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options">
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(false)}
            />

            <Button text="Delete" className="btn-danger" onClick={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
