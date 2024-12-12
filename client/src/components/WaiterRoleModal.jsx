import Button from "./ui/Button";
import useUpdateEmployeeRole from "../hooks/useUpdateEmployeeRole";
import { formatToDateString } from "../utils/dateFormat.mjs";

export default function WaiterRoleModal({
  closeModal,
  allEmployees,
  employeeIndex,
  animate,
}) {
  const employee = allEmployees[employeeIndex];
  const { submitForm } = useUpdateEmployeeRole(
    employee.id,
    closeModal,
    employeeIndex
  );

  const closeModalByClickingOutSideModal = (e) => {
    if (e.target.className == "modal " + animate) {
      closeModal(employeeIndex, "role");
    }
  };

  return (
    <div
      className={`modal ${animate}`}
      onClick={closeModalByClickingOutSideModal}
    >
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>Set Employee Role</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(employeeIndex, "role")}
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
            <span style={{ fontWeight: "bold" }}>Role</span>
            <span>{employee.is_staff ? "Bartender" : "Waiter"}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Joined</span>
            <span>{formatToDateString(employee.date_joined)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{ gap: "10px" }}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(employeeIndex, "role")}
            />

            <Button
              text="Switch Role"
              className="btn-primary"
              onClick={submitForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
