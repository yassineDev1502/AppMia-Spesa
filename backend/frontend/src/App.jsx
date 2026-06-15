import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import ExpenseForm from "./components/ExpenseForm";

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  backgroundColor: "#f2f2f2",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

function App() {
  const [expenses, setExpenses] =
    useState([]);

  const loadExpenses =
    async () => {
      const res =
        await axios.get(
          "http://localhost:5000/expenses"
        );

      setExpenses(res.data);
    };

  useEffect(() => {
    loadExpenses();
  }, []);

  const total =
    expenses.reduce(
      (sum, expense) =>
        sum +
        Number(expense.amount),
      0
    );

  const deleteExpense =
    async (id) => {
      if (
        !window.confirm(
          "Eliminare questa spesa?"
        )
      )
        return;

      await axios.delete(
        `http://localhost:5000/expenses/${id}`
      );

      loadExpenses();
    };

  const editExpense =
    async (expense) => {
      const description =
        prompt(
          "Descrizione",
          expense.description
        );

      if (!description) return;

      await axios.put(
        `http://localhost:5000/expenses/${expense.id}`,
        {
          ...expense,
          description,
        }
      );

      loadExpenses();
    };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>
        💰 Gestione Spese
      </h1>

      <h2>
        Totale: €
        {total.toFixed(2)}
      </h2>

      <ExpenseForm
        refresh={loadExpenses}
      />

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>
              Descrizione
            </th>

            <th style={thStyle}>
              Categoria
            </th>

            <th style={thStyle}>
              Data
            </th>

            <th style={thStyle}>
              Importo
            </th>

            <th style={thStyle}>
              Azioni
            </th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(
            (expense) => (
              <tr
                key={
                  expense.id
                }
              >
                <td style={tdStyle}>
                  {
                    expense.description
                  }
                </td>

                <td style={tdStyle}>
                  {
                    expense.category
                  }
                </td>

                <td style={tdStyle}>
                  {expense.date}
                </td>

                <td style={tdStyle}>
                  €
                  {
                    expense.amount
                  }
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      editExpense(
                        expense
                      )
                    }
                  >
                    ✏️
                  </button>

                  {" "}

                  <button
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;