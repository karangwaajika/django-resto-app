import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";

export default function MealForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
}) {
  return (
    <div className="meal-form">
      <div className="card" style={{ width: "60%", border: "1px solid black" }}>
        <div className="card-header">Meal/Dish Form</div>
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
              icon="fa-solid fa-cutlery"
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
            {fieldError.meal_type && (
              <i className="error-text">{fieldError.meal_type}</i>
            )}
            <div
              className={`input-group ${fieldError.meal_type && "error-field"}`}
            >
              <span className="input-icon">
                <i className="fa-solid fa-list"></i>
              </span>
              <select
                name="meal_type"
                value={form.meal_type}
                onChange={handleChange}
                errorfield={fieldError.name && "error-field"}
                id="meal_type"
                className="input-field"
              >
                <option value="">Select type</option>
                <option key={1} value="Salad">
                  Salad
                </option>
                <option key={2} value="Fried">
                  Fried
                </option>
                <option key={3} value="Stewed_Dish">
                  Stewed Dish
                </option>
                <option key={4} value="Burger">
                  Burger
                </option>
                <option key={5} value="Snack">
                  Snack
                </option>
                <option key={6} value="Pizza">
                  Pizza
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
