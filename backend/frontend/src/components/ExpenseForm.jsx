import { useState } from "react";
import axios from "axios";

export default function ExpenseForm({
  refresh,
}) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: new Date()
      .toISOString()
      .split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/expenses",
      form
    );

    setForm({
      description: "",
      amount: "",
      category: "Food",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        placeholder="Descrizione"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description:
              e.target.value,
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

      <select
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category:
              e.target.value,
          })
        }
      >
        <option value="Food">
          Food
        </option>
        <option value="Home">
          Casa
        </option>
        <option value="Transport">
          Trasporti
        </option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
          })
        }
      />

      <button type="submit">
        Salva
      </button>
    </form>
  );
}