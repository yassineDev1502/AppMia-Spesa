const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./expenses.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL,
      category TEXT,
      date TEXT
    )
  `);
});

// GET
app.get("/expenses", (req, res) => {
  db.all(
    "SELECT * FROM expenses ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

// CREATE
app.post("/expenses", (req, res) => {
  const {
    description,
    amount,
    category,
    date,
  } = req.body;

  db.run(
    `
    INSERT INTO expenses
    (description, amount, category, date)
    VALUES (?, ?, ?, ?)
    `,
    [
      description,
      amount,
      category,
      date,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
      });
    }
  );
});

// UPDATE
app.put("/expenses/:id", (req, res) => {
  const {
    description,
    amount,
    category,
    date,
  } = req.body;

  db.run(
    `
    UPDATE expenses
    SET
      description = ?,
      amount = ?,
      category = ?,
      date = ?
    WHERE id = ?
    `,
    [
      description,
      amount,
      category,
      date,
      req.params.id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
      });
    }
  );
});

// DELETE
app.delete("/expenses/:id", (req, res) => {
  db.run(
    "DELETE FROM expenses WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
      });
    }
  );
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});