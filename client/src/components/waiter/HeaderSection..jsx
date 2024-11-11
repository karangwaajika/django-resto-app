import React from "react";
import Button from "../ui/Button";

function HeaderSection() {
  return (
    <>
      <h5 style={{ textAlign: "center", fontSize: "15px", fontWeight: 400 }}>
        <i>Waiters Home Page</i>
      </h5>
      <section className="header-section">
        <h3 style={{ fontFamily: "monospace" }}>Lol Resto Bar</h3>
        <p>Waiter platform for recording orders</p>
        <Button
          text="Record order"
          className="btn-outline-lighter"
          size="25%"
        />
      </section>
    </>
  );
}

export default HeaderSection;
