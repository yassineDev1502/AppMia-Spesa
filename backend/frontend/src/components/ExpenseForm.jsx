import { useState } from "react";
import axios from "axios";

export default function ExpenseForm({ refresh }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/expenses", form);

      setForm({
        ...form,
        description: "",
        amount: "",
      });

      refresh();
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrizione"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <input
        type="number"
        step="0.01"
        placeholder="Importo"
        value={form.amount}
        onChange={(e) =>
          setForm({
            ...form,
            amount: e.target.value,
          })
        }
      />

      <button type="submit">Salva</button>
    </form>
  );
}