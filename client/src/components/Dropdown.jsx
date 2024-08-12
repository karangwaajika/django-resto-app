import Button from "./ui/Button";
export default function Dropdown({ closeDropdown, animation }) {
  const bounce = animation || "bounceIn";
  return (
    <div
      className={`card dropdown animated ${bounce}`}
      onMouseLeave={closeDropdown}
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
            <figcaption>Ajika karangwa</figcaption>
          </figure>
          <p>ajika ajika@yahoo.fr</p>
        </article>
      </div>
      <div className="buttons">
        <Button text="Update" className="btn-light" />
        <Button text="Logout" className="btn-dark" />
      </div>
    </div>
  );
}
