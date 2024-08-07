import logo from "/images/cock.avif";

export default function NavbarHome() {
  return (
    <nav className="navbar-home">
      <div className="left-info">
        <div className="logo">
          <img src={logo} alt="resto-logo" width={100} height={100} />
        </div>
        <div className="text">
          <h5>El-momento Restaurant</h5>
        </div>
      </div>
      <div className="right-info">
        <div className="logo">
          <img src={logo} alt="resto-logo" width={100} height={100} />
        </div>
        <div className="text">
          <h5>El-momento Restaurant</h5>
        </div>
      </div>
    </nav>
  );
}
