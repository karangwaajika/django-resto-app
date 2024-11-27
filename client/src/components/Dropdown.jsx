import { useState } from "react";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
export default function Dropdown({ closeModal, animate, user, logout }) {
  const navigate = useNavigate();
  return (
    <div
      className={`card dropdown ${animate}`}
      onMouseLeave={() => closeModal("profile")}
    >
      <div className="profile">
        <article>
          <figure>
            <img
              src="/images/userm2.png"
              alt="profile-pic"
              width={200}
              height={200}
            />
            <figcaption>
              {user.first_name && user.first_name}{" "}
              {user.last_name && user.last_name}
            </figcaption>
          </figure>
          <p>{user.email ? user.email : "no-email@gmail.com"}</p>
        </article>
      </div>
      <div className="buttons" style={{ gap: "5px" }}>
        <Button
          text="Update"
          className="btn-light"
          onClick={() => navigate("/dashboard/update-profile")}
        />
        <Button text="Logout" className="btn-dark" onClick={logout} />
      </div>
    </div>
  );
}
