import ProgressBar from "./ProgressBar";

export default function FlashMessage({ isSuccess, message, clearMessage }) {
  const className = isSuccess
    ? "success-message animated bounce"
    : "error-message animated shake";
  let errors = null;
  if (typeof message === "object") {
    const errorList = Object.entries(message);
    errors = errorList.map((item) => {
      return (
        <div>
          <h5>{item[0]} : </h5>
          <ul
            style={{
              fontSize: 12,
              listStyleType: "square",
              paddingLeft: "30px",
              lineHeight: "15px",
            }}
          >
            {item[1].map((subItem, key) => {
              return <li key={key}>{subItem}</li>;
            })}
          </ul>
        </div>
      );
    });
  } else {
    errors = message;
  }

  return (
    <div className={className}>
      <div style={{ padding: "5px" }}>
        {isSuccess ? <p>{message}</p> : errors}
      </div>

      <ProgressBar
        color={isSuccess ? "#b16e0a" : "#665252c7"}
        clearMessage={clearMessage}
      />
    </div>
  );
}
