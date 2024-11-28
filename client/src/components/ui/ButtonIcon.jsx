export default function ButtonIcon({
  className,
  text,
  type,
  onClick,
  name,
  width,
  height,
}) {
  const btnWidth = width ? width : "100%";
  return (
    <button
      className={className}
      onClick={onClick}
      name={name}
      style={{ width: btnWidth, height: height, display: "flex", justifyContent:"space-evenly" }}
    >
      <i className="fa-solid fa-magnifying-glass"></i>
      {/* {text}
      <i className="fa-solid fa-filter"></i> */}
    </button>
  );
}
