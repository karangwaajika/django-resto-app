import React from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function HeaderSection() {
  const navigate = useNavigate()
  return (
    <>
      <h5 style={{ textAlign: "center", fontSize: "15px", fontWeight: 400 }}>
        <i>Waiters Home Page</i>
      </h5>
      <section className="header-section" style={{marginBottom:"10px"}}>
        <h3 style={{ fontFamily: "monospace" }}>Lol Resto Bar</h3>
        <p>Waiter platform for recording orders</p>
        <Button
          text="Record order"
          className="btn-outline-lighter"
          width="300px"
          onClick={()=>navigate("/service/service")}
        />
      </section>
    </>
  );
}

export default HeaderSection;
