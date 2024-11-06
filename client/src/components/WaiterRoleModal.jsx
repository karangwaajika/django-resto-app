import Button from "./ui/Button";
import ButtonLoading from "./ui/ButtonLoading";
import useDeleteBeverage from "../hooks/useDeleteBeverage";
import { formatToDateString } from "../utils/dateFormat.mjs";
import loadingImg from "/images/r-loading.gif";
import FlashMessage from "./ui/FlashMessage";
export default function WaiterRoleModal({
  closeModal,
  setEmployees,
  allEmployees,
  employeeIndex,
  animate,
}) {
  const employee = allEmployees[employeeIndex];
  const { isLoading, message, clearMessage, submitForm } = useDeleteBeverage(
    employee,
    closeModal
  );

  const closeModalByClickingOutSideModal = (e) => {
    if (e.target.className == "modal " + animate) {
      closeModal(employeeIndex, "role");
    }
  };
  const handleSubmitForm = () => {
    closeModal(employeeIndex, "role");
    submitForm();
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
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
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
          <div className="delete-options">
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(employeeIndex, "role")}
            />

            {isLoading ? (
              <ButtonLoading
                text="Switch Role"
                className="btn-primary"
                img={loadingImg}
              />
            ) : (
              <Button
                text="Switch Role"
                className="btn-primary"
                onClick={handleSubmitForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
