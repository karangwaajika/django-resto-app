export default function Button({ className, text, type, onClick, name }) {
  return (
    <button className={className} onClick={onClick} name={name}>
      {text}
    </button>
  );
}
