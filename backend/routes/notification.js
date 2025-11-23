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
    const [rows] = await pool.query("SELECT * FROM notifications ORDER BY id DESC");
    res.json([]);
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
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM notifications WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Notification not found" });
    res.json({ id });
  } catch (err) 
  {
    console.error("Error fetching notification:", err);
    res.status(500).json({ error: "Failed to fetch notification" });
  }
});

router.post("/", async (req, res) => 
{
  try 
  {
    const data = req.body;
    const [result] = await pool.query("INSERT INTO notifications SET ?", [data]);
    res.status(201).json({ id: result.insertId, ...data });
    res.status(201).json(data);
  } catch (err) 
  {
    console.error("Error creating notification:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.put("/:id", async (req, res) =>
{
  try 
  {
    const id = req.params.id;
    const data = req.body;
    await pool.query("UPDATE notifications SET ? WHERE id = ?", [data, id]);
    res.json({ id, ...data });
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
