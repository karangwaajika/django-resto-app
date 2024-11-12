export default function InputField({
  type,
  name,
  id,
  placeholder,
  label,
  value,
  handleChange,
  icon,
  errorfield,
  height,
  width,
  errorMessage,
}) {
  const inputWidth = width ? width : "100%";
  return (
    <>
      {errorMessage && <i className="error-text">{errorMessage}</i>}
      <div
        className={`input-group ${errorfield && "error-field"}`}
        style={{ height: height, width: inputWidth }}
      >
        <span className="input-icon">
          <i className={icon}></i>
        </span>
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          className="input-field"
        />
        <span className="input-text">{label}</span>
      </div>
    </>
  );
}
