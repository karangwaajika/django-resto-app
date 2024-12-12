import Button from "./ui/Button";
import useActivateEmployee from "../hooks/useActivateEmployee";
import { formatToDateString } from "../utils/dateFormat.mjs";

export default function WaiterActivateModal({
  closeModal,
  allEmployees,
  employeeIndex,
  animate,
}) {
  const employee = allEmployees[employeeIndex];
  const { submitForm } = useActivateEmployee(
    employee.id,
    closeModal,
    employeeIndex
  );

  const closeModalByClickingOutSideModal = (e) => {
    if (e.target.className == "modal " + animate) {
      closeModal(employeeIndex, "activate");
    }
  };

  return (
    <div
      className={`modal ${animate}`}
      onClick={closeModalByClickingOutSideModal}
    >
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{employee.is_active ? "De-activate" : "Activate"} Employee</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(employeeIndex, "activate")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Firstname</span>
            <span>{employee.first_name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Lastname</span>
            <span>{employee.last_name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Status</span>
            <span>{employee.is_active ? "Active" : "Not Active"} </span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Joined</span>
            <span>{formatToDateString(employee.date_joined)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{gap: "10px"}}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(employeeIndex, "activate")}
            />
            {employee.is_active ? (
              <Button
                text="De-Activate"
                className="btn-danger"
                onClick={submitForm}
              />
            ) : (
              <Button
                text="Activate"
                className="btn-primary"
                onClick={submitForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
