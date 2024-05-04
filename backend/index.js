const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./model");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/CRUD")
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
