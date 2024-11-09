import React from "react";
import Navbar from "../../components/waiter/Navbar";
import "../../assets/service.css";
import { createContext } from "react";
import useProtectPage from "../../hooks/useProtectPage";

export const userContext = createContext();
function Home() {
  const { userInfo } = useProtectPage();
  return (
    <main className="service">
      <userContext.Provider value={Object.keys(userInfo).length && userInfo}>
        <Navbar />
        <h5 style={{textAlign:"center"}}><i>Waiters Home Page</i></h5>
        <div>
          
        </div>
      </userContext.Provider>
    </main>
  );
}

export default Home;
