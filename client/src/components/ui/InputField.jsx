export default function InputField({
  type,
  name,
  id,
  placeholder,
  label,
  value,
  handleChange,
  icon,
  errorField,
}) {
  return (
    <div className={`input-group ${errorField && "error-field"}`}>
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
  );
}
