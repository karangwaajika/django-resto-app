import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";

export default function TeaForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
}) {
  return (
    <div className="tea-form">
      <div className="card" style={{ width: "60%", border: "1px solid black" }}>
        <div className="card-header">Tea Form</div>
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
                <option value="">Select type</option>
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
                text="Submit"
                className="btn-dark"
                img={loadingImg}
              />
            ) : (
              <Button text="Submit" className="btn-dark" />
            )}
          </form>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}
