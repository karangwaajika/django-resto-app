import Button from "../ui/Button";
import useDeleteTea from "../../hooks/useDeleteTea";
import { addComma } from "../../utils/addComma.mjs";
import { formatToDateString } from "../../utils/dateFormat.mjs";

export default function ConfirmModal({
  itemData,
  animate,
  closeModal,
  editOrder,
}) {
  const handleSubmitOrderData = () => {
    closeModal();
    editOrder();
  };
  return (
    <div className={`modal ${animate}`}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{itemData.itemName}</h2>
          <div className="modal-close-button" onClick={() => closeModal()}>
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
            <span>{addComma(itemData.itemPrice)}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Total</span>
            <span>{addComma(itemData.itemTotal)}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{itemData.itemSoldDate}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{ gap: "5px" }}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal()}
            />

            <Button
              text="Delete"
              className="btn-danger"
              onClick={handleSubmitOrderData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
