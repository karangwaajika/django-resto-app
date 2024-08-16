import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";

export default function BeverageBrandForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
}) {
  return (
    <div className="beverage-add-form">
      <div className="card" style={{ border: "1px solid black" }}>
        <div className="card-header">Beverage Brand Form</div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="card-body">
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
                <option value="">Select type</option>
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
            {isLoading ? (
              <ButtonLoading
                text="Submit"
                className="btn-dark"
                img={loadingImg}
              />
            ) : (
              <Button text="Submit" className="btn-dark" name="add-brand" />
            )}
          </form>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}
