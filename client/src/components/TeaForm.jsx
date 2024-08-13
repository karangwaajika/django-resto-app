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
}) {
  return (
    <div className="tea-form">
      <div
        className="card"
        style={{ width: "600px", border: "1px solid black" }}
      >
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
            <InputField
              type="text"
              name="name"
              id="name"
              label="Name"
              icon="fa-solid fa-coffee"
              placeholder="Name"
              handleChange={handleChange}
              value={form.name}
            />
            <InputField
              type="number"
              name="price"
              id="price"
              label="Price"
              icon="fa fa-euro"
              placeholder="Price"
              handleChange={handleChange}
              value={form.price}
            />
            <div className="input-group">
              <span className="input-icon">
                <i className="fa-solid fa-list"></i>
              </span>
              <select
                name="tea_type"
                value={form.tea_type}
                onChange={handleChange}
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
                text="Login"
                className="btn-dark"
                img={loadingImg}
              />
            ) : (
              <Button text="Login" className="btn-dark-outline" />
            )}
          </form>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}
