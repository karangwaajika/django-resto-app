import Button from "./ui/Button";
import useDeleteTea from "../hooks/useDeleteTea";
import { addComma } from "../utils/addComma.mjs";
import { formatToDateString } from "../utils/dateFormat.mjs";

export default function DeleteTeaModal({
  closeModal,
  allTeas,
  teaIndex,
  animate,
}) {
  const tea = allTeas[teaIndex];
  const { submitForm } = useDeleteTea(tea, closeModal, teaIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(teaIndex, "delete");
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{tea.name}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(teaIndex, "delete")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

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
              onClick={() => closeModal(teaIndex, "delete")}
            />

            <Button text="Delete" className="btn-danger" onClick={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
