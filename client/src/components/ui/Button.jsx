export default function Button({ className, text, type, handleClick }) {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
}
