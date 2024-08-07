import "../assets/Home.css";
import LoginForm from "../components/LoginForm";
import NavbarHome from "../components/NavbarHome";

function App() {
  return (
    <div className="app-container">
      <NavbarHome />
      <LoginForm />
    </div>
  );
}

export default App;
