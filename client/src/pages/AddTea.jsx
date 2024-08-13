import "../assets/AddTea.css";
import TeaForm from "../components/TeaForm";
export default function AddTea() {
  return (
    <div className="add-tea-content">
      <div className="tea-header">
        <h2>Add Tea/Coffee</h2>
        <p style={{fontSize: "14px"}}>Add Tea, Coffee and Drinks such as Juice, Ice Cream and Smoothies</p>
      </div>
      <TeaForm />
    </div>
  );
}
