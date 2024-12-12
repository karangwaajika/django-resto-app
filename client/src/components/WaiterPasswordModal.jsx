import Button from "./ui/Button";
import InputField from "./ui/InputField";
import useChangeEmployeePassword from "../hooks/useChangeEmployeePassword";
export default function WaiterPasswordModal({
  closeModal,
  allEmployees,
  employeeIndex,
  animate,
}) {
  const employee = allEmployees[employeeIndex];
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm: submitForm,
  } = useChangeEmployeePassword(employee, closeModal, employeeIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(employeeIndex, "password");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h2 className="waiter-pass-text">Change {employee.first_name} password</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(employeeIndex, "password")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <form onSubmit={submitForm} className="beverage-form">
            {fieldError.password && (
              <i className="error-text">{fieldError.password}</i>
            )}
            <InputField
              type="password"
              name="password"
              id="password"
              errorfield={fieldError.password && "error-field"}
              label="Password"
              icon="fa-solid fa-key"
              placeholder="***************"
              handleChange={handleChange}
              value={form.password}
            />

            {fieldError.confirmPassword && (
              <i className="error-text">{fieldError.confirmPassword}</i>
            )}
            <InputField
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              errorfield={fieldError.confirmPassword && "error-field"}
              label="Confirm_password"
              icon="fa-solid fa-key"
              placeholder="***************"
              handleChange={handleChange}
              value={form.confirmPassword}
            />

            <Button text="Submit" className="btn-dark" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
