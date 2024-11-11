import "../../assets/service.css";
import { createContext } from "react";
import useProtectPage from "../../hooks/useProtectPage";
import Navbar from "../../components/waiter/Navbar";
import { Outlet } from "react-router-dom";

export const userContext = createContext();
function Service() {
  const { userInfo } = useProtectPage();
  return (
    <main className="service">
      <userContext.Provider value={Object.keys(userInfo).length && userInfo}>
        <Navbar />
        <Outlet context={userInfo} />
      </userContext.Provider>
    </main>
  );
}

export default Service;
