const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const database = require("./config/database");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

mongoose
  .connect(
    process.env.CUSTOMCONNSTR_MyConnectionStringcher || database.localUrl
  )
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("Not connected to mongo db", err));

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
