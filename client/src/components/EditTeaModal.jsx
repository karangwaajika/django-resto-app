import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";
import useEditTea from "../hooks/useEditTea";
export default function EditTeaModal({ closeModal, animation, tea }) {
  const {
    isLoading,
    form,
    fieldError,
    message,
    clearMessage,
    handleChange,
    validateSubmitForm: submitForm,
  } = useEditTea(tea);

  const handleCloseModal = (e) => {
    if (e.target.className == "modal animated fadeIn") {
      closeModal();
    }
  };
  return (
    <div className={`modal ${animation}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h2>Update Subject</h2>
          {message && (
            <FlashMessage
              message={message.message}
              isSuccess={message.success}
              clearMessage={clearMessage}
            />
          )}
          <div className="modal-close-button" onClick={closeModal}>
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            {fieldError.name && <i className="error-text">{fieldError.name}</i>}
            <InputField
              type="text"
              name="name"
              id="name"
              errorfield={fieldError.name && "error-field"}
              label="Name"
              icon="fa-solid fa-coffee"
              placeholder="Name"
              handleChange={handleChange}
              value={form.name}
            />
            {fieldError.price && (
              <i className="error-text">{fieldError.price}</i>
            )}
            <InputField
              type="number"
              name="price"
              id="price"
              errorfield={fieldError.price && "error-field"}
              label="Price"
              icon="fa fa-euro"
              placeholder="Price"
              handleChange={handleChange}
              value={form.price}
            />
            {fieldError.tea_type && (
              <i className="error-text">{fieldError.tea_type}</i>
            )}
            <div
              className={`input-group ${fieldError.tea_type && "error-field"}`}
            >
              <span className="input-icon">
                <i className="fa-solid fa-list"></i>
              </span>
              <select
                name="tea_type"
                value={form.tea_type}
                onChange={handleChange}
                errorfield={fieldError.name && "error-field"}
                id="tea_type"
                className="input-field"
              >
                <option value={form.tea_type}>{form.tea_type}</option>
                <option key={1} value="Tea">
                  Tea
                </option>
                <option key={2} value="Coffee">
                  Coffee
                </option>
                <option key={3} value="Juice">
                  Juice
                </option>
              </select>
              <span className="input-text">Type</span>
            </div>
            {isLoading ? (
              <ButtonLoading
                text="Login"
                className="btn-dark"
                img={loadingImg}
              />
            ) : (
              <Button text="Login" className="btn-dark" />
            )}
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
