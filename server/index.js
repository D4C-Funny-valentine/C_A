require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const { Socket } = require("socket.io");
const connectDB = require("./config/connectDB");

connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoute"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
