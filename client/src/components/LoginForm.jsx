import Button from "./ui/Button";
import InputField from "./ui/InputField";
import { useState } from "react";
import axios from "axios";
import ButtonLoading from "./ui/ButtonLoading";
import loadingImg from "/images/b-loading2.gif";
import { useNavigate } from "react-router-dom";
import FlashMessage from "./ui/FlashMessage";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_LOGIN_USER_API, {
        username: form.username,
        password: form.password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token); //store the token in a local storage
          navigate("/dashboard");
        } else {
          console.log(res.data);
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
    <div className="login-container">
      <div className="overlay">
        <div className="login-form">
          <div className="card" style={{ width: "600px" }}>
            <div className="card-header">Sign in</div>
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
                  name="username"
                  id="username"
                  label="Username"
                  icon="fa-solid fa-user"
                  placeholder="username"
                  handleChange={handleChange}
                />
                <InputField
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  icon="fa-solid fa-lock"
                  placeholder="*************"
                  handleChange={handleChange}
                />
                {isLoading ? (
                  <ButtonLoading
                    text="Login"
                    className="btn-primary"
                    img={loadingImg}
                  />
                ) : (
                  <Button text="Login" className="btn-primary" />
                )}
              </form>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
