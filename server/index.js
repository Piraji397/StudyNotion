const express = require("express");
const app = express();

const database = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

//connect to database
database.connect();

//middlewares
app.use(express.json());

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
