import { createContext } from "react";
import useProtectPage from "../../hooks/useProtectPage";
import Navbar from "../../components/waiter/Navbar";
import { Outlet } from "react-router-dom";

export const userContext = createContext();
function Service() {
  const { userInfo } = useProtectPage();
  return (
    <div className="app-container service">
      <userContext.Provider value={Object.keys(userInfo).length && userInfo}>
        <header className="header">
          <Navbar />
        </header>
        <main className="main service-home">
          <Outlet context={userInfo} />
        </main>
      </userContext.Provider>
    </div>
  );
}

export default Service;
