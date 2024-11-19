import React from "react";

function Textarea({
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
}) {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
      style={{ height: height, borderRadius: "5px", padding:"5px" }}
    />
  );
}

export default Textarea;
