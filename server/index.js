require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const connectDB = require("./config/connectDB");

connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/chat", require("./routes/userRoute"));

const expressServer = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("sendUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(userId, "connected");
  });

  socket.on("send-message", (data) => {
    const sendUserSocketId = onlineUsers.get(data.to);
    if (sendUserSocketId) {
      socket.to(sendUserSocketId).emit("receive-message", data.message);
    }
  });

  socket.on("isTyping", (data) => {
    console.log(data);
    const sendUserSocketId = onlineUsers.get(data.to);
    socket.to(sendUserSocketId).emit("typing", data.typing);
  });
});
