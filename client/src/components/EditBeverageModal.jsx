import Button from "./ui/Button";
import InputField from "./ui/InputField";
import useEditBeverage from "../hooks/useEditBeverage";
export default function EditBeverageModal({
  closeModal,
  allBeverages,
  beverageIndex,
  animate,
}) {
  const beverage = allBeverages[beverageIndex];
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm: submitForm,
  } = useEditBeverage(beverage, closeModal, beverageIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(beverageIndex, "edit");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h2>Update Beverage</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(beverageIndex, "edit")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <form onSubmit={submitForm} className="beverage-form">
            {fieldError.name && <i className="error-text">{fieldError.name}</i>}
            <InputField
              type="text"
              name="name"
              id="name"
              errorfield={fieldError.name && "error-field"}
              label="Name"
              icon="fa-solid fa-wine-bottle"
              placeholder="Name"
              handleChange={handleChange}
              value={form.name}
            />

            {fieldError.beverage_type && (
              <i className="error-text">{fieldError.beverage_type}</i>
            )}
            <div
              className={`input-group ${
                fieldError.beverage_type && "error-field"
              }`}
            >
              <span className="input-icon">
                <i className="fa-solid fa-list"></i>
              </span>
              <select
                name="beverage_type"
                value={form.beverage_type}
                onChange={handleChange}
                errorfield={fieldError.beverage_type && "error-field"}
                id="beverage_type"
                className="input-field"
              >
                <option value={form.beverage_type}>{form.beverage_type}</option>
                <option key={1} value="Soda">
                  Soda
                </option>
                <option key={2} value="Water">
                  Water
                </option>
                <option key={3} value="Wine">
                  Wine
                </option>
                <option key={4} value="Beer">
                  Beer
                </option>
              </select>
              <span className="input-text">Type</span>
            </div>
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
            {fieldError.qty && <i className="error-text">{fieldError.qty}</i>}
            <InputField
              type="number"
              name="qty"
              id="qty"
              errorfield={fieldError.qty && "error-field"}
              label="Qty"
              icon="fa-solid fa-weight-scale"
              placeholder="Qty"
              handleChange={handleChange}
              value={form.qty}
            />
            <Button text="Submit" className="btn-dark" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
