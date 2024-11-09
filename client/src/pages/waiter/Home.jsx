import React from "react";
import Navbar from "../../components/waiter/Navbar";
import "../../assets/service.css";
import { createContext } from "react";
import useProtectPage from "../../hooks/useProtectPage";

export const userContext = createContext();
function Home() {
  const { userInfo } = useProtectPage();
  return (
    <main>
      <userContext.Provider value={Object.keys(userInfo).length && userInfo}>
        <Navbar />
        <h1>Home Page</h1>
      </userContext.Provider>
    </main>
  );
}

export default Home;
