export default function Button({ className, text, type, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}
