export default function CustomDatePicker({
  value,
  height,
  width,
  reff,
  onClick,
  icon,
  label,
}) {
  const inputWidth = width ? width : "100%";
  return (
    <>
      <div
        className={`input-group`}
        style={{ height: height, width: inputWidth }}
      >
        <span className="input-icon">
          <i className={icon}></i>
        </span>
        <button
          onClick={onClick}
          className="input-field"
          ref={reff}
          style={{ backgroundColor: "white", color: "grey", textAlign:"left" }}
        >
          {value}
        </button>
        <span className="input-text">{label}</span>
      </div>
    </>
  );
}
