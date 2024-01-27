const express = require("express");
const app = express();

const userRoutes = require("./routes/User");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

//connect to database
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//mount the routes
app.use("/api/v1/auth", userRoutes);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    messsage: "Your server is up and running...",
  });
});

//activate the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
