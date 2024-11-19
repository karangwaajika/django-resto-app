import Button from "./ui/Button";
export default function Dropdown({ closeModal, animate, user, logout }) {
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
      <div className="buttons">
        <Button text="Update" className="btn-light" />
        <Button text="Logout" className="btn-dark" onClick={logout} />
      </div>
    </div>
  );
}
