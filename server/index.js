const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
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

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cluodinary connection
cloudinaryConnect();

//mount the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

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
