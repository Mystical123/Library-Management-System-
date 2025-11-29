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

router.get("/health", (req, res) => res.json({ ok: true, route: "notification" }));

router.get("/", async (req, res) => 
{
  try 
  {
    const [rows] = await pool.query("SELECT * FROM notifications ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) 
  {
    console.error("Error listing notifications:", err);
    res.status(500).json({ error: "Failed to list notifications" });
  }
});

router.get("/:id", async (req, res) => 
{
 try 
  {
    const userId = req.params.userId;
    const [rows] = await pool.query("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",[userId]);
    res.json(rows);
  } catch (err) 
  {
    console.error("Error fetching notifications for user:", err);
    res.status(500).json({ error: "Failed to fetch notifications for user" });
  }
});

router.post("/", async (req, res) => 
  {
  try 
  {
    const { user_id, message } = req.body;
    if (!user_id || !message) 
    {
      return res.status(400).json({ error: "user_id and message are required" });
    }
    const [result] = await pool.query("INSERT INTO notifications (user_id, message) VALUES (?, ?)",[user_id, message]);
    res.status(201).json
    ({
      id: result.insertId,
      user_id,
      message,
      is_read: 0,
    });
  } catch (err) 
  {
    console.error("Error creating notification:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.put("/:id/read", async (req, res) => {
  try 
  {
    const id = req.params.id;
    await pool.query("UPDATE notifications SET is_read = 1 WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) 
  {
    console.error("Error updating notification:", err);
    res.status(500).json({ error: "Failed to update notification" });
  }
});

router.delete("/:id", async (req, res) => 
{
  try 
  {
    const id = req.params.id;
    await pool.query("DELETE FROM notifications WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) 
  {
    console.error("Error deleting notification:", err);
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

module.exports = router;
