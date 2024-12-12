import WaiterForm from "../components/WaiterForm";
import { useState } from "react";
import fieldValidation from "../utils/fieldValidation.mjs";
import axios from "axios";
export default function AddWaiter() {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    task: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
      password: form.password,
      confirmPassword: form.confirmPassword,
      task: form.task,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);

    if (Object.keys(validatedFields).length == 0) {
      submitForm();
    }
  };

  const submitForm = (e) => {
    setIsLoading(true);
    const isDevelopment = import.meta.env.MODE === "production";
    const url = isDevelopment
      ? import.meta.env.VITE_REACT_APP_ADD_EMPLOYEE_API_DEPLOY
      : import.meta.env.VITE_REACT_APP_ADD_EMPLOYEE_API;
    axios
      .post(
        url,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.username,
          password: form.password,
          is_staff: form.task,
        },
        {
          headers: {
            Authorization:
              "Token " +
              localStorage.getItem(import.meta.env.VITE_REACT_APP_TOKEN),
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data);
        } else {
          setMessage(res.data);
        }
      })
      .catch((err) => {
        setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="add-waiter-content">
      <div className="waiter-header" style={{ textAlign: "center" }}>
        <h2>Add Waiter/Bartender</h2>
        <p className="waiter-text">
          The Form below provides Username and Password so that waiter or
          bartender can sign in in order to insert client order.
        </p>
      </div>

      <WaiterForm
        message={message}
        isLoading={isLoading}
        form={form}
        handleChange={handleChange}
        submitForm={validateSubmitForm}
        clearMessage={clearMessage}
        fieldError={fieldError}
        inPage="addWaiter"
      />
      <div className="card form-validation-rules">
        <div className="card-header">
          <h3>Account Rules</h3>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              Username Required. 150 characters or fewer. Letters, digits and
              @/./+/-/_ only.
            </li>
            <li className="list-group-item">
              Your password can’t be too similar to your other personal
              information.
            </li>
            <li className="list-group-item">
              Your password must contain at least 8 characters.
            </li>
            <li className="list-group-item">
              Your password can’t be a commonly used password.
            </li>
            <li className="list-group-item">
              Your password can’t be entirely numeric.
            </li>
            <li className="list-group-item">
              Enter the same password as before, for verification.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
