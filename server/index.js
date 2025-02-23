require("./config/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API!");
});
app.use("/api/task", indexRouter);
app.use("*", (req, res, next) => res.send("404"));

app.listen(process.env.PORT || 8080, () =>
  console.log("Server running on port 8080"),
);
