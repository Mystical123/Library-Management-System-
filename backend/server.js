console.log("Server starting...");

const express = require("express");
const app = express();
const cors = require("cors");

// import routes
const booksRoutes = require("./routes/books");
const wishlistRoutes = require("./routes/wishlist");
const searchRoutes = require("./routes/search");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const notificationRoutes = require("./routes/notification");
const reservationRoutes = require("./routes/reservation");

app.use(cors());
app.use(express.json());


app.get("/api/search/test", (req, res) => {
  console.log("Search test route hit");
  res.json({ ok: true });
});


app.get("/test", (req, res) => {
  console.log("Test route called");
  res.send("Server is working");
});


// mount routes
app.use("/api/books", booksRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/reservation", reservationRoutes);


app.listen(3001, () => console.log("Backend running on 3001"));
