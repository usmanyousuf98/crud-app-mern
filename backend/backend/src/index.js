const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usersRouter = require("./routers/recipes");
const { handleError } = require("./utils/error");
require("dotenv").config();

const { mongoUri } = process.env;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("not connected");
    console.log(err);
  });

const app = express();

app.use(cors());

app.use((req, res, next) => {
  const { method, path } = req;
  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/api/v1/activity");
});

app.use("/api/v1/users", usersRouter);
app.use(cors());

app.use(handleError);
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
