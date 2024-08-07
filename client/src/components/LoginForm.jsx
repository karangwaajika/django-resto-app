import Button from "./ui/Button";
import InputField from "./ui/InputField";

export default function LoginForm() {
  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-form">
          <div className="card" style={{ width: "600px" }}>
            <div className="card-header">Sign in</div>
            <div className="card-body">
              <form>
                <InputField
                  type="text"
                  name="username"
                  id="username"
                  label="Username"
                  icon="fa-solid fa-user"
                  placeholder="username"
                />
                <InputField
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  icon="fa-solid fa-lock"
                  placeholder="*************"
                />
                <Button text="Login" className="btn-primary" />
              </form>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
