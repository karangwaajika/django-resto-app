export default function MultipleInputField({
  type,
  name,
  id,
  placeholder,
  label,
  value,
  handleChange,
  icon,
  height,
  width,
  errorMessage,
  keysArray,
  removeSearchKey,
  onChange,
}) {
  const inputWidth = width ? width : "100%";
  const [inputKeys, setInputKeys] = useState([]);
  const handleSearch = (e) => {
    if (e.keyCode == 32 || e.keyCode == 13) {
      setInputKeys((oldArray) => [...oldArray, e.target.value]);
      setTimeout(() => {
        e.target.value = "";
        setSearch("");
      }, 100);
    }
  };
  const removeSearchKey = (index) => {
    setInputKeys((oldArray) => {
      const newArray = oldArray.filter((item, i) => i !== index);
      return newArray;
    });
  };
  return (
    <>
      {errorMessage && <i className="error-text">{errorMessage}</i>}
      <div
        className="input-container"
        style={{ height: height, width: inputWidth }}
      >
        <span className="input-icon">
          <i className={icon}></i>
        </span>
        <div className="input-items">
          {keysArray.length > 0 &&
            keysArray.map((item, index) => {
              return (
                <div className="input-item" key={index}>
                  {item}{" "}
                  <i
                    className="fa fa-xmark item-icon"
                    onClick={() => removeSearchKey(index)}
                  ></i>
                </div>
              );
            })}
        </div>
        <input
          type={type}
          name={name}
          id={id}
          onKeyDown={handleChange}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          className="input-field"
        />
        <span className="input-text">{label}</span>
      </div>
    </>
  );
}
