import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";

export default function UpdateWaiterForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
  ...props
}) {
  return (
    <div className="waiter-form">
      <div className="card" style={{ border: "1px solid black" }}>
        <div className="card-header">Employee Form</div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="card-body">
          <form onSubmit={submitForm}>
            <div className="form-row">
              <div className="first-name" style={{ width: "49%" }}>
                {fieldError.firstName && (
                  <i className="error-text">{fieldError.firstName}</i>
                )}
                <InputField
                  type="text"
                  name="firstName"
                  id="firstName"
                  errorfield={fieldError.firstName && "error-field"}
                  label="First_name"
                  icon="fa-solid fa-user"
                  placeholder={
                    props.user.first_name ? props.user.first_name : "First Name"
                  }
                  handleChange={handleChange}
                  value={form.firstName}
                />
              </div>
              <div className="last-name" style={{ width: "49%" }}>
                {fieldError.lastName && (
                  <i className="error-text">{fieldError.lastName}</i>
                )}
                <InputField
                  type="text"
                  name="lastName"
                  id="lastName"
                  errorfield={fieldError.lastName && "error-field"}
                  label="Last_name"
                  icon="fa-solid fa-user"
                  placeholder={
                    props.user.last_name ? props.user.last_name : "Last Name"
                  }
                  handleChange={handleChange}
                  value={form.lastName}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="password" style={{ width: "49%" }}>
                {fieldError.password && (
                  <i className="error-text">{fieldError.password}</i>
                )}
                <InputField
                  type="password"
                  name="password"
                  id="password"
                  errorfield={fieldError.password && "error-field"}
                  label="Password"
                  icon="fa-solid fa-key"
                  placeholder="***************"
                  handleChange={handleChange}
                  value={form.password}
                />
              </div>
              <div className="confirm-password" style={{ width: "49%" }}>
                {fieldError.confirmPassword && (
                  <i className="error-text">{fieldError.confirmPassword}</i>
                )}
                <InputField
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  errorfield={fieldError.confirmPassword && "error-field"}
                  label="Confirm_password"
                  icon="fa-solid fa-key"
                  placeholder="***************"
                  handleChange={handleChange}
                  value={form.confirmPassword}
                />
              </div>
            </div>

            <div className="username">
              {fieldError.username && (
                <i className="error-text">{fieldError.username}</i>
              )}
              <InputField
                type="text"
                name="username"
                id="username"
                errorfield={fieldError.username && "error-field"}
                label="username"
                icon="fa fa-user"
                placeholder={
                  props.user.username ? props.user.username : "Username"
                }
                handleChange={handleChange}
                value={form.userName}
              />
            </div>
            <div className="tasks">
              <fieldset className="input-group radio-fieldset">
                <legend>Your role</legend>
                Manager
              </fieldset>
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
