import React from "react";
import Navbar from "../../components/waiter/Navbar";
import "../../assets/service.css";
import { createContext } from "react";
import useProtectPage from "../../hooks/useProtectPage";
import MenuSection from "./MenuSection";
import HeaderSection from "./HeaderSection.";

export const userContext = createContext();
function Home() {
  const { userInfo } = useProtectPage();
  return (
    <main className="service">
      <userContext.Provider value={Object.keys(userInfo).length && userInfo}>
        <Navbar />
        <HeaderSection />
        <MenuSection />
      </userContext.Provider>
    </main>
  );
}

export default Home;
