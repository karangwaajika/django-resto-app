export default function FlashMessage({ isSuccess, message, clearMessage }) {
  const className = isSuccess
    ? "success-message animated bounce"
    : "error-message animated shake";
  return (
    <div className={className}>
      <p>{message}</p>
      <i className="fa fa-times remove-message" onClick={clearMessage}></i>
    </div>
  );
}
