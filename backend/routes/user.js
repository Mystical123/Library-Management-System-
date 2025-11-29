const express = require("express");
const mysql = require("mysql2/promise");
const router = express.Router();

const pool = mysql.createPool({
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
  res.json({ ok: true, route: "user" });
});

router.get("/", async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query("SELECT id, name, email, created_at FROM users");
    res.json(rows);
  } catch (err) 
  {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/:id", async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);

  } catch (err) 
  {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.post("/", async (req, res) => {
  try 
  {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "name, email, and password are required" });

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email
    });

  } catch (err) 
  {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.put("/:id", async (req, res) => 
{
  try 
  {
    const { name, email, password } = req.body;

    const fields = [];
    const values = [];

    if (name) { fields.push("name = ?"); values.push(name); }
    if (email) { fields.push("email = ?"); values.push(email); }
    if (password) { fields.push("password = ?"); values.push(password); }

    if (fields.length === 0)
      return res.status(400).json({ error: "Nothing to update" });

    values.push(req.params.id);

    await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);

    res.json({ ok: true });

  } catch (err) 
  {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => 
{
  try 
  {
    await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) 
  {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
