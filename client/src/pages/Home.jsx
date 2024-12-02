import LoginForm from "../components/LoginForm";
import NavbarHome from "../components/NavbarHome";
import lolImg from "/images/lol.jpg";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <NavbarHome />
      </header>
      <main className="main main-home">
        <div className="overlay">
          <div className="login-text" >
            <h3 style={{fontFamily:"cursive"}}>Welcome Back L&#128514;L Staff!!</h3>
            <p>Login to start your daily stask!</p>
          </div>
          <div className="login-text-large-device" >
            <h1 style={{fontFamily:"cursive"}}>L&#128514;L Management I.S Platform</h1>
            <p>Login to start your daily stask!</p>
          </div>
          <LoginForm />
          <div className="contact-text">
            <p>Having trouble loging in? please contact the manager</p>
          </div>
        </div>
      </main>
      <Footer subClass="footer-home" />
    </div>
  );
}

export default App;
