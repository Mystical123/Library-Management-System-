const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

const pool = mysql.createPool
({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_catalog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/health", (req, res) => 
{
  res.json({ ok: true, route: "reservation" });
});

router.get("/", async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query("SELECT * FROM reservations ORDER BY reserved_at DESC");
    res.json(rows);
  } catch (err) 
  {
    console.error("Error listing reservations:", err);
    res.status(500).json({ error: "Failed to list reservations" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const [rows] = await pool.query("SELECT * FROM reservations WHERE user_id = ? ORDER BY reserved_at DESC",[userId]);
    res.json(rows);
  } catch (err) 
  {
    console.error("Error fetching reservations for user:", err);
    res.status(500).json({ error: "Failed to fetch reservations for user" });
  }
});

router.post("/", async (req, res) => 
{
  try 
  {
    const { user_id, book_id, due_date } = req.body;
    if (!user_id || !book_id) 
    {
      return res
        .status(400)
        .json({ error: "user_id and book_id are required" });
    }

    const [result] = await pool.query("INSERT INTO reservations (user_id, book_id, due_date, status) VALUES (?, ?, ?, 'pending')",[user_id, book_id, due_date || null]);

    res.status(201).json
    ({
      id: result.insertId,
      user_id,
      book_id,
      due_date: due_date || null,
      status: "pending",
    });
  } catch (err) 
  {
    console.error("Error creating reservation:", err);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

router.put("/:id", async (req, res) => 
{                          // updates reservation 
  try 
  {
    const id = req.params.id;
    const { status, due_date } = req.body;

    // a dynamic quarey
    const fields = [];
    const values = [];

    if (status) 
    {
      fields.push("status = ?");
      values.push(status);
    }
    if (due_date !== undefined) 
    {
      fields.push("due_date = ?");
      values.push(due_date || null);
    }

    if (!fields.length) 
    {
      return res.status(400).json({ error: "Nothing to update" });
    }

    values.push(id);
    const sql = `UPDATE reservations SET ${fields.join(", ")} WHERE id = ?`;

    await pool.query(sql, values);
    res.json({ ok: true });
  } catch (err) 
  {
    console.error("Error updating reservation:", err);
    res.status(500).json({ error: "Failed to update reservation" });
  }
});

router.delete("/:id", async (req, res) => {
  try 
  {
    const id = req.params.id;
    await pool.query("DELETE FROM reservations WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) 
  {
    console.error("Error deleting reservation:", err);
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});

module.exports = router;
