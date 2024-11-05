import "../assets/Home.css";
import LoginForm from "../components/LoginForm";
import NavbarHome from "../components/NavbarHome";
import lolImg from "/images/lol.jpg";

function App() {
  return (
    <div className="app-container">
      <NavbarHome />
      <LoginForm />
      <div className="lolImg">
        <img src={lolImg} alt="lol" width={100} height={100} />
      </div>
    </div>
  );
}

export default App;
