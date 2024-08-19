import "../assets/Waiter.css";
import WaiterForm from "../components/WaiterForm";
import { useState } from "react";
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
    task: "",
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
    axios
      .post(import.meta.env.VITE_REACT_APP_ADD_TEA_API, {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
        isStaff: form.task,
      })
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
        <p style={{ fontSize: "14px" }}>
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
      />
      <div className="card form-validation-rules">
        <div className="card-header">
          <h3>Account Rules</h3>
        </div>
        <div className="card-body">
          <ul class="list-group">
            <li class="list-group-item">
              Username Required. 150 characters or fewer. Letters, digits and
              @/./+/-/_ only.
            </li>
            <li class="list-group-item">
              Your password can’t be too similar to your other personal
              information.
            </li>
            <li class="list-group-item">
              Your password must contain at least 8 characters.
            </li>
            <li class="list-group-item">
              Your password can’t be a commonly used password.
            </li>
            <li class="list-group-item">
              Your password can’t be entirely numeric.
            </li>
            <li class="list-group-item">
              Enter the same password as before, for verification.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
