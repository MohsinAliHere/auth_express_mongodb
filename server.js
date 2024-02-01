require("dotenv").config();
const { connectDb } = require("./database");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/auth");

// connect database
connectDb();

app.use(
  express.json({
    urlencoded: true,
  })
);

// routes
app.use("/api/v1", authRoutes);

// port listen
app.listen(3000, () => console.log("Listening On Port", port));
