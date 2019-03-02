/**
 * Run file .env to set environment variables
 */
require("dotenv").config();

const express = require("express");
const http = require("http");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes");
const config = require("./config");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "./views")));

app.use("/", routes);

/** Connect database mongodb  */
mongoose.connect(
  config.uriMongo,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (err) {
      console.error(err);
      return process.exit(0);
    }
    console.log("MongoDB is connected");
    console.log("Mongo URI is ", config.uriMongo);
  }
);

// redirect other path to ./build
app.get("*", (req, res, next) => {
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

<<<<<<< HEAD

const port = process.env.PORT || '5000';
app.set('port', port);
=======
const port = process.env.PORT || "3000";
app.set("port", port);
>>>>>>> ae789ac8fbe1ac0e57a9ce2a33cfaa655d43a614

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
