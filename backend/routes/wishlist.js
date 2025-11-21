const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();
console.log("Wishlist route loaded");


const pool = mysql.createPool({
  host: "localhost",
  user: "root",          // MySQL user
  password: "",          // MySQL password 
  database: "book_catalog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// GET /api/wishlist
router.get("/", async (req, res) => {
    console.log("Wishlist GET called");
  try {
    const [rows] = await pool.query(`
      SELECT w.id AS wishlist_id, b.*
      FROM wishlist w
      JOIN books b ON b.id = w.book_id
      ORDER BY w.added_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch wishlist" });
  }
});

// POST /api/wishlist
router.post("/", async (req, res) => {
  try {
    const { book_id } = req.body;
    if (!book_id) return res.status(400).json({ error: "book_id required" });

    await pool.query(
      `INSERT INTO wishlist (user_id, book_id) VALUES (NULL, ?)
       ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP`,
      [book_id]
    );

    const [rows] = await pool.query(
      `SELECT w.id AS wishlist_id, b.*
       FROM wishlist w JOIN books b ON b.id = w.book_id
       WHERE w.book_id = ? AND w.user_id IS NULL`,
      [book_id]
    );

    res.status(201).json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to add to wishlist" });
  }
});

// DELETE /api/wishlist/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query(`DELETE FROM wishlist WHERE id = ?`, [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to remove from wishlist" });
  }
});

module.exports = router;
