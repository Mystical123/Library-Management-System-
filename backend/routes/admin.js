const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const router = express.Router();

const pool = mysql.createPool(
{
  host: "localhost",
  user: "root",
  password: "",
  database: "book_catalog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.post("/login", async (req, res) => 
  {
  try 
  {
    const { username, password } = req.body;

    if (!username || !password) 
    {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Get admin from DB
    const [rows] = await pool.query("SELECT * FROM admins WHERE username = ? LIMIT 1",[username]);

    if (rows.length === 0) 
    {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const admin = rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);   // Check hashed password

    if (!isMatch) 
    {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json    // this will print when you are able to login
    ({
      message: "Login successful",    
      admin: 
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });

  } catch (err) 
  {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

router.get("/health", (req, res) => 
{
  res.json({ ok: true, route: "admin" });
});

router.get("/", async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query("SELECT id, username, role, created_at FROM admins");
    res.json(rows);
  } catch (err) 
  {
    console.error("Error getting admins:", err);
    res.status(500).json({ error: "Failed to get admins" });
  }
});

router.get("/:id", async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query("SELECT id, username, role, created_at FROM admins WHERE id = ?", [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ error: "Admin not found" });
    res.json(rows[0]);

  } catch (err) 
  {
    console.error("Error getting admin:", err);
    res.status(500).json({ error: "Failed to fetch admin" });
  }
});

router.post("/", async (req, res) => 
{
  try 
  {
    const { username, password, role } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "username and password are required" });

    const [result] = await pool.query(
      "INSERT INTO admins (username, password, role) VALUES (?, ?, ?)",
      [username, password, role || "admin"]
    );

    res.status(201).json({
      id: result.insertId,
      username,
      role: role || "admin"
    });

  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ error: "Failed to create admin" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const fields = [];
    const values = [];

    if (username) { fields.push("username = ?"); values.push(username); }
    if (password) { fields.push("password = ?"); values.push(password); }
    if (role) { fields.push("role = ?"); values.push(role); }

    if (fields.length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    values.push(req.params.id);

    await pool.query(`UPDATE admins SET ${fields.join(", ")} WHERE id = ?`, values);

    res.json({ ok: true });

  } catch (err) 
  {
    console.error("Error updating admin:", err);
    res.status(500).json({ error: "Failed to update admin" });
  }
});

router.delete("/:id", async (req, res) => 
{
  try 
  {
    await pool.query("DELETE FROM admins WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("Error deleting admin:", err);
    res.status(500).json({ error: "Failed to delete admin" });
  }
});

module.exports = router;
