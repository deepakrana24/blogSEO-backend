const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// froutes

const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB is connected "))
  .catch((err) => console.log(err));

//app
const app = express();
// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env == "development") {
  app.use(
    cors({
      origin: `${process.env.CLIENT_URL}`,
    })
  );
}

// routes
// app.get("/", (req, res) => {
//   res.json("hi deepak");
// });
// app.get("/api", (req, res) => {
//   res.json({ time: Date().toString() });
// });

// routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});
