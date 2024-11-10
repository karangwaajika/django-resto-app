export default function Button({ className, text, type, onClick, name, size }) {
  return (
    <button className={className} onClick={onClick} name={name} style={{width:size}}>
      {text}
    </button>
  );
}
