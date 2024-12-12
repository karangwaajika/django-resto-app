export default function Button({
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
      style={{ width: btnWidth, height: height, textWrap: "nowrap" }}
    >
      {text}
    </button>
  );
}
