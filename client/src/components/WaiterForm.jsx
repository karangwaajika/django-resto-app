import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/n-loading.gif";

export default function WaiterForm({
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
          <form onSubmit={submitForm} className="form" style={{ gap: "10px" }}>
            <div className="waiter-form-row" >
              <div className="first-name" style={{width:"100%"}}>
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
                  placeholder={"First Name"}
                  handleChange={handleChange}
                  value={form.firstName}
                />
              </div>
              <div className="last-name" style={{width:"100%"}}>
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
                  placeholder={"Last Name"}
                  handleChange={handleChange}
                  value={form.lastName}
                />
              </div>
            </div>
            <div className="waiter-form-row" >
              <div className="password" style={{width:"100%"}}>
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
              <div className="confirm-password" style={{width:"100%"}}>
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
                placeholder={"Username"}
                handleChange={handleChange}
                value={form.userName}
              />
            </div>
            <div className="tasks">
              <fieldset className="input-group radio-fieldset">
                <legend>Choose user roll</legend>

                <div className="bartender">
                  <input
                    type="radio"
                    id="Bartender"
                    name="task"
                    value="1"
                    onChange={handleChange}
                  />
                  <label htmlFor="Bartender">Bartender</label>
                </div>
                <div className="waiter">
                  <input
                    type="radio"
                    id="Waiter"
                    name="task"
                    value="0"
                    checked={form.task == "0"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Waiter">Waiter</label>
                </div>
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
  );
}
