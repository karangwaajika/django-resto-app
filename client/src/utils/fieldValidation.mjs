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
  ...arg
}) {
  const errorsValidation = {};
  if (name !== undefined) {
    if (!name.trim()) {
      errorsValidation.name = "Name is required";
    } else if (name.length < 3) {
      errorsValidation["name"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z -]+$/.test(name)) {
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

  // waiter form input

  if (arg.firstName !== undefined) {
    if (!arg.firstName.trim()) {
      errorsValidation.firstName = "firstName is required";
    } else if (arg.firstName.length < 3) {
      errorsValidation["firstName"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z ]+$/.test(arg.firstName)) {
      errorsValidation.firstName = "Use letters only";
    }
  }
  if (arg.lastName !== undefined) {
    if (!arg.lastName.trim()) {
      errorsValidation.lastName = "lastName is required";
    } else if (arg.lastName.length < 3) {
      errorsValidation["lastName"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z ]+$/.test(arg.lastName)) {
      errorsValidation.lastName = "Use letters only";
    }
  }
  if (arg.username !== undefined) {
    if (!arg.username.trim()) {
      errorsValidation.username = "username is required";
    } else if (arg.username.length < 3) {
      errorsValidation["username"] = "Characters should be greater than 3";
    }
  }

  if (arg.password !== undefined) {
    if (!arg.password.trim()) {
      errorsValidation.password = "password is required";
    } else if (arg.password.length < 3) {
      errorsValidation["password"] = "Characters should be greater than 3";
    }
  }

  if (arg.password !== arg.confirmPassword) {
    errorsValidation["password"] = "Passwords do not match";
  }

  // order form input
  if (arg.beverageQty !== undefined) {
    if (arg.beverageQty == 0) {
      errorsValidation.beverageQty = "qty is required";
    } else if (arg.beverageQty < 0) {
      errorsValidation.beverageQty = "qty can't be less than or equal to zero";
    } else if (!/^[0-9]+$/.test(arg.beverageQty)) {
      errorsValidation.beverageQty = "Only digits are allowed";
    }
  }
  if (arg.mealQty !== undefined) {
    if (arg.mealQty == 0) {
      errorsValidation.mealQty = "qty is required";
    } else if (arg.mealQty < 0) {
      errorsValidation.mealQty = "qty can't be less than or equal to 0";
    } else if (!/^[0-9]+$/.test(arg.mealQty)) {
      errorsValidation.mealQty = "Only digits are allowed";
    }
  }

  if (arg.orderId !== undefined) {
    if (!arg.orderId.trim()) {
      errorsValidation.orderId = "order code is required";
    } else if (arg.orderId <= 0) {
      errorsValidation.orderId = "code can't be less than or equal to 0";
    } else if (!/^[0-9]+$/.test(arg.orderId)) {
      errorsValidation.orderId = "Only digits are allowed";
    }
  }
  if (arg.teaQty !== undefined) {
    if (arg.teaQty == 0) {
      errorsValidation.teaQty = "qty is required";
    } else if (arg.teaQty <= 0) {
      errorsValidation.teaQty = "qty can't be less than or equal to 0";
    } else if (!/^[0-9]+$/.test(arg.teaQty)) {
      errorsValidation.teaQty = "Only digits are allowed";
    }
  }

  if (arg.customerName !== undefined) {
    if (!arg.customerName.trim()) {
      errorsValidation.customerName = "Name is required";
    } else if (arg.customerName.length < 3) {
      errorsValidation["customerName"] = "Characters should be greater than 3";
    }
  }

  if (arg.beverageName !== undefined) {
    if (!arg.beverageName.trim()) {
      errorsValidation.beverageName = "Name is required";
    } else if (arg.beverageName.length < 3) {
      errorsValidation["beverageName"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z -]+$/.test(arg.beverageName)) {
      errorsValidation.beverageName = "Use letters only";
    }
  }
  if (arg.mealName !== undefined) {
    if (!arg.mealName.trim()) {
      errorsValidation.mealName = "Name is required";
    } else if (arg.mealName.length < 3) {
      errorsValidation["mealName"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z -]+$/.test(arg.mealName)) {
      errorsValidation.mealName = "Use letters only";
    }
  }
  if (arg.teaName !== undefined) {
    if (!arg.teaName.trim()) {
      errorsValidation.teaName = "Name is required";
    } else if (arg.teaName.length < 3) {
      errorsValidation["teaName"] = "Characters should be greater than 3";
    } else if (!/^[a-zA-Z -]+$/.test(arg.teaName)) {
      errorsValidation.teaName = "Use letters only";
    }
  }
  // approve order form
  if (arg.momo !== undefined) {
    if (arg.momo !== 0) {
      if (arg.teaQty < 0) {
        errorsValidation.momo = "no negative number";
      } else if (!/^[0-9]+$/.test(arg.momo)) {
        errorsValidation.momo = "Only digits are allowed so set Zero insted";
      }
    }
  }
  if (arg.cash) {
    if (arg.cash !== 0) {
      if (arg.teaQty < 0) {
        errorsValidation.cash = "no negative number";
      } else if (!/^[0-9]+$/.test(arg.cash)) {
        errorsValidation.cash = "Only digits are allowed so set Zero insted";
      }
    }
  }

  return errorsValidation;
}
