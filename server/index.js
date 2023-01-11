const express = require("express");
const cors = require("cors");

const app = express();
const userRouter = require("./routes/routes"); 
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// app.get("/", (req, res) =>
// {console.log("server stareddddd");
//   res.json({ success: true, message: "server is running!" })}
// );

app.use("/api", userRouter);

module.exports = app;
