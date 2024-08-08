export default function ButtonLoading({ img, text, className }) {
  return (
    <button className={`btn-loading ${className}`}>
      <div className="btn-text">{text}</div>
      <img src={img} alt="loading" className="btn-img" width={50} height={50} />
    </button>
  );
}
