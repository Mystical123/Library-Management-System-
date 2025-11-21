const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

console.log("Search route loaded");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_catalog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Quick test route
router.get("/test", (req, res) => {
  console.log("Search test route hit");
  res.json({ ok: true });
});

// GET /api/search?q=term&field=all|title|author|genre
router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();
    const field = (req.query.field || "all").toString();

    if (!q) return res.json([]);

    const like = `%${q}%`;
    let sql = "";
    let params = [];

    if (field === "title") {
      sql = "SELECT * FROM books WHERE title LIKE ? LIMIT 200";
      params = [like];
    } else if (field === "author") {
      sql = "SELECT * FROM books WHERE author LIKE ? LIMIT 200";
      params = [like];
    } else if (field === "genre") {
      sql = "SELECT * FROM books WHERE genre LIKE ? LIMIT 200";
      params = [like];
    } else {
      sql = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR genre LIKE ? LIMIT 200`;
      params = [like, like, like];
    }

    const [rows] = await pool.query(sql, params);
    return res.json(rows);
  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
