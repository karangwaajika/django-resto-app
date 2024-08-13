import "../assets/AddTea.css";
import TeaForm from "../components/TeaForm";
import { useState } from "react";
import axios from "axios";

export default function AddTea() {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    tea_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(import.meta.env.VITE_REACT_APP_ADD_TEA_API, {
        name: form.name,
        price: form.price,
        tea_type: form.tea_type,
      })
      .then((res) => {
        if (res.data.success) {
          setMessage(res.data);
        } else {
          setMessage(res.data);
        }
      })
      .catch((err) => {
        setMessage({
          success: false,
          message: err.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="add-tea-content">
      <div className="tea-header">
        <h2>Add Tea/Coffee</h2>
        <p style={{ fontSize: "14px" }}>
          Add Tea, Coffee and Drinks such as Juice, Ice Cream and Smoothies
        </p>
      </div>
      <TeaForm
        message={message}
        isLoading={isLoading}
        form={form}
        handleChange={handleChange}
        submitForm={submitForm}
        clearMessage={clearMessage}
      />
    </div>
  );
}
