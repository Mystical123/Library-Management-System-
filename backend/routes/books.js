// backend/routes/books.js
const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",          // keep empty string i did not create password
  database: "book_catalog", 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    console.error("Error querying books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = router;
