export default function fieldValidation({
  name,
  email,
  price,
  tea_type,
  meal_type,
  beverage_type,
  qty,
  beverage,
  purchase_date,
}) {
  const errorsValidation = {};
  if (name !== undefined) {
    if (!name.trim()) {
      errorsValidation.name = "Name is required";
    } else if (name.length < 3) {
      errorsValidation["name"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      errorsValidation.name = "Use letters only";
    }
  }

  if (price !== undefined) {
    if (price == 0) {
      errorsValidation.price = "Price is required";
    } else if (price < 100) {
      errorsValidation["price"] = "Price can't be less than 100";
    } else if (!/^[0-9]+$/.test(price)) {
      errorsValidation.price = "Only digits are allowed";
    }
  }
  if (tea_type !== undefined) {
    if (tea_type == "") {
      errorsValidation.tea_type = "Tea type wasn't provided";
    }
  }
  if (meal_type !== undefined) {
    if (meal_type == "") {
      errorsValidation.meal_type = "Meal type wasn't provided";
    }
  }
  if (beverage_type !== undefined) {
    if (beverage_type == "") {
      errorsValidation.beverage_type = "Beverage type wasn't provided";
    }
  }
  if (purchase_date !== undefined) {
    if (purchase_date == "") {
      errorsValidation.purchase_date = "Date is required";
    }
  }
  if (beverage !== undefined) {
    if (beverage == "") {
      errorsValidation.beverage = "Beverage is required";
    }
  }

  if (qty !== undefined) {
    if (qty == 0) {
      errorsValidation.qty = "qty is required";
    } else if (qty < 0) {
      errorsValidation.qty = "qty can't be less than 100";
    } else if (!/^[0-9]+$/.test(qty)) {
      errorsValidation.qty = "Only digits are allowed";
    }
  }

  return errorsValidation;
}
