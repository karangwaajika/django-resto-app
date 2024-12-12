import Button from "./ui/Button";
import InputField from "./ui/InputField";
import useEditMeal from "../hooks/useEditMeal";
export default function EditMealModal({
  closeModal,
  allMeals,
  mealIndex,
  animate,
}) {
  const meal = allMeals[mealIndex];
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm: submitForm,
  } = useEditMeal(meal, closeModal, mealIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(mealIndex, "edit");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h2>Update Meal</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(mealIndex, "edit")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm} className="meal-form">
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
                <option value={form.meal_type}>{form.meal_type}</option>
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
            <Button text="Submit" className="btn-dark" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
